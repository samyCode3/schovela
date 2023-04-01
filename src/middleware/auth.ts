import * as express from 'express'
import {verifyTokens} from '../helper/token'
import { ApiResponseType } from '../interface/api.interface';
import {
    StatusCodes
   } from 'http-status-codes'
export const NotVerifiedUser = async (req, res, next): Promise<ApiResponseType> => {
   try {
      const authHeader = req.headers.authorization
      if (!authHeader) {
        return {
          ok: false,
          status: StatusCodes.UNAUTHORIZED,
          message: 'User is not authorized'
        }
      }
  
      const token = authHeader.split(" ")[1];
      const userToken = await verifyTokens(token, process.env.BEERER_TOKEN)
      if (!userToken) {
        return {
          ok: false,
          status: StatusCodes.FORBIDDEN,
          message: 'User is not authorized'
        }
      }
      req.user = userToken
      next()
    } catch (err) {
      const error = new Error(err.message)
      console.error(error)
      return res.status(403).json({ message: err.message })
    }
}
export const VerifiedUser = async (req, res, next): Promise<object> => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return {
        ok: false,
        status: StatusCodes.UNAUTHORIZED,
        message: 'User is not authorized'
      }
    }

    const token = authHeader.split(" ")[1];
    const userToken = await await verifyTokens(token, process.env.ACCESS_TOKEN)
    if (!userToken) {
      return {
        ok: false,
        status: StatusCodes.FORBIDDEN,
        message: 'User is not authorized'
      }
    }
    req.user = userToken
    next()
  } catch (err) {
    const error = new Error(err.message)
    console.error(error) 
    return res.status(403).json({ message: err.message })
  }
}