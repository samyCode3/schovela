import * as express from 'express'
import { UserModel } from '../model/user.model'
import {verifyTokens} from '../helper/token'
import { ApiResponseType } from '../interface/api.interface';
import {
    StatusCodes
   } from 'http-status-codes'
import messages from '../utils/messages';

export const NotVerifiedUser = async (req, res, next): Promise<ApiResponseType> => {
   try {
      const authHeader = req.headers.authorization
      if (!authHeader) {
      return res.status(StatusCodes.UNAUTHORIZED).json( { ok: false, status: StatusCodes.UNAUTHORIZED, message: messages.UNAUTHORIZED
        })
      }
  
      const token = authHeader.split(" ")[1];
      const userToken = await verifyTokens(token, process.env.BEERER_TOKEN)
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
      return res.status(403).json({ok: false, status: StatusCodes.INTERNAL_SERVER_ERROR, message: err.message })
    }
}
export const VerifiedUser = async (req, res, next): Promise<ApiResponseType> => {
  try {
      const email = req.user.data.email
      const user = await UserModel.findOne({ where: { email : email}})
      if(user.status !== true) {
        return {
          ok: false, status: StatusCodes.UNAUTHORIZED, message: messages.UNAUTHORIZED
       
        }
      }
      next()
  } catch (err) {
    const error = new Error(err.message)
    console.error(error) 
    return res.status(403).json({ok: false, status: StatusCodes.INTERNAL_SERVER_ERROR, message: err.message }) 
  }
}

