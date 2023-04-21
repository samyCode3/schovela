import { UserModel } from '../model/user.model'
import  messages from '../utils/messages'
import {emailTemplete} from '../templete/email.templete'
import {OtpGen} from '../packages/otp'
import {decrypt, encrypt} from  '../helper/encryption'
import {bearerToken} from '../helper/token'
import {IRegister, IUserInfo,  IverifyUser, IUser, ILogin, IForgotten, IChangePassword } from '../interface/user.interface';
import { ApiResponseType } from '../interface/api.interface';
import {ExcludeField} from '../helper/exclude'
import {
 StatusCodes
} from 'http-status-codes'


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
    const otp = OtpGen(4);
    console.log(otp)
    // const sendMail = await emailTemplete(payload.email, otp) 
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
    if( !findUser || !verifyCode) { return { ok: false, status: StatusCodes.BAD_REQUEST,message: messages.INCORRECT_OTP_CODE}}
    const UserPassword = await encrypt(password)
    await UserModel.update({status: true, confirmationCode: '', password : UserPassword}, {where: {email : email}})
   
    return { ok: true, status: StatusCodes.OK, message : messages.CONTINUE}
  
}
//Resend Otp 
export const ResentOtp = async (user: IUser) => {
          const email = user.data.email
          const findUser =  await UserModel.findOne({ where: { email: email }})
          if(!findUser || findUser.status != false) {
            throw { ok: false, status: StatusCodes.BAD_REQUEST, message: messages.VERIFIED}
          }
          const otp = OtpGen(4);
          // console.log(otp)
          const sendMail = await emailTemplete(email, otp) 
          const confirmationCode =  await encrypt(otp)
          await UserModel.update({confirmationCode: confirmationCode}, {where: {email : email}})
          return {
            ok: true,
           status: StatusCodes.OK,
           message: messages.CHECK_FOR_OTP,
          } 
     }

//User Info 
export const UserInfo = async (payload: IUserInfo, auth: IUser): Promise<ApiResponseType> => {
    const email = auth.data.email
    let user =  await UserModel.findOne({ where: { email: email }})
    if(!user || user.status != true) {
      return { ok: false, status: StatusCodes.UNAUTHORIZED, message: messages.UNAUTHORIZED_REQUEST}
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
      message: messages.INCORRECT_LOGIN_DETAILS
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
   return {
    ok : true,
    status: StatusCodes.OK,
    message: messages.LOGGEDIN
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
  console.log(otp)
  // await emailTemplete(otp, email)
  const resetToken = await encrypt(otp)
  await UserModel.update({ resetToken }, {where : { email : email}})
  return {
    ok: true,
    status: StatusCodes.OK,
    message: messages.CHECK_FOR_OTP
  }

}

export const ResetPassword  = async (payload: IChangePassword ): Promise<ApiResponseType> => {
   let {email, code, NewPassword} = payload
   const user =  await UserModel.findOne({ where : { email : email}});
   const decryptCode = await decrypt(code, user.resetToken)
   if(!decryptCode) {
    throw {
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
      message: messages.PASSWORD_IS_CHANGED 
   }
   
}