import * as express from 'express'
import { UserModel } from '../model/user.model'
import {verifyTokens, refreshToken, bearerToken} from '../helper/token'
import { ApiResponseType } from '../interface/api.interface';
import { ROLE } from '../interface/user.interface';
import {
    StatusCodes
   } from 'http-status-codes'
import messages from '../utils/messages';

export const AuthUser = async (req, res, next): Promise<ApiResponseType> => {
   try {
      const authHeader = req.headers.authorization
      if (!authHeader) {
      return res.status(StatusCodes.UNAUTHORIZED).json( { ok: false, status: StatusCodes.UNAUTHORIZED, message: messages.UNAUTHORIZED
        })
      }
  
      const token = authHeader.split(" ")[1];
      const userToken = await verifyTokens(token, process.env.BEARER_TOKEN)
      const findUser = await UserModel.findOne({where : { email : userToken.data.email}})
      if (!findUser) {
        return {
          ok: false,
          status: StatusCodes.FORBIDDEN,
          message: messages.FORBIDDEN
        }
      }
      req.user = userToken
      next()
    } catch (err) {
      const error = new Error(err.message)
      console.error(error)
      return res.status(StatusCodes.UNAUTHORIZED).json({ok: false, status: StatusCodes.UNAUTHORIZED, message: err.message })
    }
}
export const VerifiedUser = async (req, res, next): Promise<ApiResponseType> => {
  try {
      const {email} = req.user.data
      const user = await UserModel.findOne({ where: { email : email}})
      if(user.status !== true) {
        return {
          ok: false, status: StatusCodes.UNAUTHORIZED, message: messages.UNAUTHORIZED
       
        }
      }
      next()
  } catch (err) {
    const error = new Error(err.message)
    return res.status(403).json({ok: false, status: StatusCodes.FORBIDDEN, message: err.message }) 
  }
}


export const RefreshToken = async(req, res, next) => {
      try {
       const refresh = refreshToken(req.user)
      if(!refresh) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ ok: false, status: StatusCodes.UNAUTHORIZED,  messages : 'This user is unauthorized'})
      }
      const token = await verifyTokens(refresh, process.env.REFRESH_TOKEN)
      if(!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ ok: false, status: StatusCodes.UNAUTHORIZED,  messages : 'This user is unauthorized'})
      }
      const newRefreshToken = bearerToken(token)
      if(!newRefreshToken) {
        return res.status(StatusCodes.FORBIDDEN).json({ ok: false, status: StatusCodes.FORBIDDEN,  messages : 'This user is forbidden'})
      }
      req.user = newRefreshToken
      console.log(req.user)
      next()
      } catch(err) {
        const error = new Error(err.message)
        return res.status(403).json({ok: false, status: StatusCodes.FORBIDDEN, message: err.message }) 
      }
}
export const IsAdmin = async (req, res, next) => {
  try {
    const {email} = req.user.data
    console.log(email)
    const  user = await UserModel.findOne({ where :{email}})
   if(!user) {
    throw  {
      ok: false,
      status: StatusCodes.UNAUTHORIZED,
      message: "You are not authorized to perform this request"
      
    }
   }
     if(user.role !== ROLE.admin){
         throw  {
           ok: false,
           status: StatusCodes.FORBIDDEN,
           message: "User is not allow to perform this action",
           body : { user }
           
         }
     }
    req.user = user
   next()
  } catch (err) {
    const error = new Error(err.message)
    return res.status(403).json({ok: false, status: StatusCodes.FORBIDDEN, message: err.message }) 
  } 
 
}

export const IsUser = async (req, res, next) => {
  try {
     const {email} = req.user.data
     console.log(req.user)
     const user = await UserModel.findOne({ where :  {email}})
     if(user.role != ROLE.user) {
      throw  {
        ok: false,
        status: StatusCodes.FORBIDDEN,
        message: "You are not authorized to perform this request"
        
      }
     }
     req.user = user
     next()
  } catch (err) {
    const error = new Error(err.message)
    return res.status(403).json({ok: false, status: StatusCodes.FORBIDDEN, message: err.message }) 
  } 
}