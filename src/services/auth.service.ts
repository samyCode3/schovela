import { UserModel } from '../model/user.model'
import  messages from '../utils/messages'
import {emailTemplete} from '../templete/email.templete'
import {token} from '../packages/otp'
import {encryptData, decryptData} from  '../helper/encryption'
import {bearerToken, accessToken} from '../helper/token'
import { IRegister, IUserInfo,  IverifyUser, IUser, ILogin} from '../interface/user.interface';
import { ApiResponseType } from '../interface/api.interface';
import {
 StatusCodes
} from 'http-status-codes'

export const registerService  =  async (payload: IRegister): Promise<ApiResponseType> => {
   try {
    const  findUser = await UserModel.findOne({ where: { email: payload.email }})
    if(findUser) {
       return {
         ok: false,
         status : StatusCodes.BAD_REQUEST,
         message : messages.DUPLICATE_EMAIL
       }
    } 
    const otp = await token
    console.log(otp)
    // const sendMail = await emailTemplete(payload.email, otp) 
    const bearerTokens = await bearerToken(payload)
    // if(!sendMail) {
    //   return {
    //      ok: false,
    //      status: StatusCodes.BAD_GATEWAY,
    //      message : 'Unable to communicate with server'
    //    }
    // } 
    const confirmationCode =  await encryptData(otp)
    const registerUser =  await UserModel.create({confirmationCode, ...payload})
     return {
       ok: true,
       message: 'User is registered successfully',
       status: StatusCodes.OK,
       body: {registerUser, bearerTokens} 
     }
   } catch (error) {
    if(error) {return { ok: false, status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message,}}
   }
       
 }
//  566605
export  const  verifyUser = async (payload:  IverifyUser, user: IUser): Promise<ApiResponseType> => {
  try {
    const email = user.data.email
    const { code, password } = payload
    const findUser =  await UserModel.findOne({ where: { email: email }})
    const verifyCode =  await decryptData(code, findUser.confirmationCode)
    if( !findUser || !verifyCode) { return { ok: false, status: StatusCodes.BAD_REQUEST,message: 'Invalid code provide provide'}}
    const Token = await accessToken(findUser)
    const UserPassword = await encryptData(password)
    await UserModel.update({status: true, confirmationCode: '', password : UserPassword}, {where: {email : email}})
    return { ok: true, status: StatusCodes.OK, message : 'You can now process to the next step', body : {Token}}
  } catch (error) {
    if(error) {return { ok: false, status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message,}}
  }
}
//Resend Otp 
export const ResentOtp = async (user: IUser) => {
     try {
          const email = user.data.email
          const findUser =  await UserModel.findOne({ where: { email: email }})
          if(!findUser || findUser.status != false) {
            return { ok: false, status: StatusCodes.FORBIDDEN, message: 'Sorry you cant make this request'}
          }
          const otp = await token
          const sendMail = await emailTemplete(email, otp) 
          if(!sendMail) {
            return {
               ok: false,
               status: StatusCodes.BAD_GATEWAY,
               message : 'Unable to communicate with server'
             }
          } 
          const confirmationCode =  await encryptData(otp)
          await UserModel.update({confirmationCode: confirmationCode}, {where: {email : email}})
          return {
            ok: true,
           status: StatusCodes.OK,
           message: 'Check email for otp',
          } 
     } catch (error) {
      if(error) {return { ok: false, status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message,}}
     }
}
//User Info 
export const UserInfo = async (payload: IUserInfo, user: IUser): Promise<ApiResponseType> => {
    const email = user.data.email
    const findUser =  await UserModel.findOne({ where: { email: email }})
    if(!findUser || findUser.status != true) {
      return { ok: false, status: StatusCodes.UNAUTHORIZED, message: 'Please verify ur account before you process'}
    }
   const update = await UserModel.update({ ...payload }, {where : {email : email}})
   return {
    ok: true,
    status: StatusCodes.OK,
    message: 'Your profile is saved, you can process to login',
    body : { update  }
  }
} 
//Login User
export const LoginUser = async (payload:  ILogin) => {
   const {email , password} = payload
   const findUser = await UserModel.findOne({ where: { email: email }})
   console.log(findUser.password)
   if(!findUser || findUser.status != true) {
    return {
      ok : false, 
      status: StatusCodes.BAD_REQUEST,
      message: 'Incorrect email or password'
    }
   }
   const comparePassword = await decryptData(password, findUser.password)
   
   if(!comparePassword) {
    return {
      ok : false, 
      status: StatusCodes.BAD_REQUEST,
      message: 'Incorrect email or password'
    }
   }
   return {
    ok : true,
    status: StatusCodes.OK,
    message: 'User is loggedin'
   }
}
//Forget Password