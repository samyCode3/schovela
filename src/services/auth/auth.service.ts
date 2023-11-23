import { UserModel } from '../../model/user.model'
import  messages from '../../utils/messages'
import {emailTemplate} from '../../template/email.template'
import {OtpGen} from '../../packages/otp'
import {decrypt, encrypt} from  '../../helper/encryption'
import {bearerToken} from '../../helper/token'
import {IRegister, IUserInfo,  IverifyUser, IUser, ILogin, IForgotten, IChangePassword } from '../../interface/user.interface';
import { ApiResponseType } from '../../interface/api.interface';
import {ExcludeField} from '../../helper/exclude'
import { StatusCodes } from 'http-status-codes'


export const registerService  =  async (payload: IRegister): Promise<ApiResponseType> => {
    const  findUser = await UserModel.findOne({ where: { email: payload.email }});
    if(findUser) {
      if(findUser.password != '' || findUser.status !== false){
        throw {
          ok: false,
          status : StatusCodes.BAD_REQUEST,
          message : messages.DUPLICATE_EMAIL
        }
      }
    } 
    const otp = OtpGen(6);
    try{
      await emailTemplate(payload.email, otp) 
    }catch(error){
      console.error(error);
      throw { ok : false, message : messages.FAILED_TO_SEND_EMAIL, status : StatusCodes.INTERNAL_SERVER_ERROR };
    }
    const bearerTokens = await bearerToken(payload)
    const confirmationCode =  await encrypt(otp.toString())
    let user;
    if(findUser){
      user = findUser;
      user.confirmationCode = confirmationCode;
      user.fullname = payload.fullname;
      await user.save();
    }else{ 
      
      user = await UserModel.create({confirmationCode, ...payload});
      user = ExcludeField(user.dataValues, ['password', 'confirmationCode', 'resetToken'])
      
    }
     return {
       ok: true,
       message: messages.CREATED,
       status: StatusCodes.CREATED,
       body: {user, bearerTokens} 
     }
   } 

   //verifyUser
export  const  verifyUser = async (payload:  IverifyUser, user: IUser): Promise<ApiResponseType> => {
    const email = user.data.email
    const { code, password } = payload
    const findUser =  await UserModel.findOne({ where: { email: email }})
    const verifyCode =  await decrypt(code, findUser.confirmationCode)
    if(!findUser || !verifyCode) { return { ok: false, status: StatusCodes.BAD_REQUEST,message: messages.INCORRECT_OTP_CODE}}
    const UserPassword = await encrypt(password)
    await UserModel.update({status: true, confirmationCode: '', password : UserPassword}, {where: {email : email}})
    return { ok: true, status: StatusCodes.OK, message : messages.CONTINUE, body : {}} 
  
}
//Resend Otp 
export const ResentOtp = async (user: IUser) => {
          const email = user.data.email
          const findUser =  await UserModel.findOne({ where: { email: email }})
          if(!findUser || findUser.status != false) {
            throw { ok: false, status: StatusCodes.BAD_REQUEST, message: messages.VERIFIED}
          }
          const otp = OtpGen(6);
          try {
            await emailTemplate(email, otp)
          } catch (error) {
            throw { ok : false, message : messages.FAILED_TO_SEND_EMAIL, status : StatusCodes.INTERNAL_SERVER_ERROR };
          }
          const confirmationCode =  await encrypt(otp.toString())
          await UserModel.update({confirmationCode: confirmationCode}, {where: {email : email}})
          return {
            ok: true,
           status: StatusCodes.OK,
           message: messages.CHECK_FOR_OTP,
           body : {}
          } 
     }

//User Info 
export const UserInfo = async (payload: IUserInfo, auth: IUser): Promise<ApiResponseType> => {
    const email = auth.data.email
    let user =  await UserModel.findOne({ where: { email: email }})
    if(!user || user.status != true) {
      throw { ok: false, status: StatusCodes.UNAUTHORIZED, message: messages.UNAUTHORIZED_REQUEST}
    }
    let keys = Object.keys(payload);
    for(let i = 0; i < keys.length; i++){
      user[keys[i]] = payload[keys[i]];
    }
    user.save()
    user = user.dataValues;
    ExcludeField(user, ['password', 'resetToken', 'confirmationCode'])
    return {
    ok: true,
    status: StatusCodes.OK,
    message: messages.INFO_ADDED,
    body : { user  }
  }
} 
//Login User
export const LoginUser = async (payload:  ILogin) => {
   const {email , password} = payload
   const user = await UserModel.findOne({ where: { email: email }})

   if(!user) {
    throw {
      ok : false, 
      status: StatusCodes.BAD_REQUEST,
      message: messages.INCORRECT_LOGIN_DETAILS,
    }
   }
   // 302 status
   let otp = OtpGen(6);
   let bearerTokens = await bearerToken({ fullname : user.fullname, email, id : user.id })
   let confirmationCode =  await encrypt(otp.toString())
   if(user.status !== true) {
    try{
      await emailTemplate(user.email, otp) 
    }catch(error){
      console.error(error);
      throw { ok : false, message : messages.FAILED_TO_SEND_EMAIL, status : StatusCodes.INTERNAL_SERVER_ERROR };
    }
   await UserModel.update({confirmationCode}, {where: {id: user.id}});
       return {
           ok: true,
           status: StatusCodes.TEMPORARY_REDIRECT,
           message : `Please check your email, or spam for verification code`,
           body: {bearerTokens}
       }
   }
    
   const comparePassword = await decrypt(password, user.password)
   if(!comparePassword) {
    throw {
      ok : false, 
      status: StatusCodes.BAD_REQUEST,
      message: messages.INCORRECT_LOGIN_DETAILS,
    }
   }
   
   
   let resUser = ExcludeField(user.dataValues, ['password', 'confirmationCode', 'resetToken']);
   
   return {
    ok : true,
    status: StatusCodes.OK,
    message: messages.LOGGEDIN,
    body : { user : resUser, bearerTokens }
   }
}
//Forget Password
export const forgottenPassword = async (payload: IForgotten): Promise<ApiResponseType> => {
  const { email } = payload
  const user = await UserModel.findOne({ where: { email: email}})
 
  if(!user) {
    throw {
       ok: false, 
       status: StatusCodes.NOT_FOUND,
       message: messages.USER_NOT_FOUND
    }
  }
  const otp = OtpGen(4)
  
  try {
    await emailTemplate(payload.email, otp) 
  } catch (error) {
    throw { ok : false, message : messages.FAILED_TO_SEND_EMAIL, status : StatusCodes.INTERNAL_SERVER_ERROR };
  }
  const resetToken = await encrypt(otp.toString())
  await UserModel.update({ resetToken }, {where : { email : email}})
  return {
    ok: true,
    status: StatusCodes.OK,
    message: messages.CHECK_FOR_OTP,
    body : {}
  }

}

export const ResetPassword  = async (payload: IChangePassword ): Promise<ApiResponseType> => {
   let {email, code, NewPassword} = payload
   const user =  await UserModel.findOne({ where : { email : email}});
   if(!user) {
   return {
      ok: false,
      status: StatusCodes.FORBIDDEN,
      message: messages.INCORRECT_OTP_CODE
    }
   }
   const decryptCode = await decrypt(code, user.resetToken)
   if(!decryptCode) {
    return {
      ok: false,
      status: StatusCodes.FORBIDDEN,
      message: messages.INCORRECT_OTP_CODE
    }
   }
   NewPassword = await encrypt(NewPassword)
   await UserModel.update({ password: NewPassword, resetToken : '' }, {where : { email : email}})
   return {
      ok: true,
      status: StatusCodes.OK,
      message: messages.PASSWORD_IS_CHANGED,
      body : {}
   }
   
}