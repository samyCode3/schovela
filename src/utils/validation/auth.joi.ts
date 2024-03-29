import * as Joi from 'joi'
import {
 StatusCodes
} from 'http-status-codes'
import { IRegister, IverifyUser, IUserInfo, ILogin, IForgotten, IChangePassword } from '../../interface/user.interface';
import { ApiResponseType } from '../../interface/api.interface';
export const registerSchema = (payload: IRegister): Promise<ApiResponseType> => {
      const body = Joi.object({
        fullname: Joi.string().required().min(4).max(10000),
        email: Joi.string().email().required()
      })
      const {error, value} = body.validate(payload, {abortEarly: true})
      if(error) {
        throw { ok : false, status: StatusCodes.BAD_REQUEST, message: error.message};
      }
      return value;
}

export const verifySchema = async (payload: IverifyUser): Promise<ApiResponseType> => {
   const body = Joi.object({
     code : Joi.string().required(),
     password: Joi.string().required().min(8).max(10000),
     confirmPassword: Joi.ref('password')
   })
   const {error, value} = body.validate(payload, {abortEarly: true})
      if(error) {
        throw { ok : false, status: StatusCodes.BAD_REQUEST, message: error.message};
      }
      return value;
}


export const UserInfoSchema = async (schema: IUserInfo) : Promise<ApiResponseType> => {
  const body = Joi.object({
      department : Joi.string().optional(),
      level : Joi.number().optional(),
      phone : Joi.string().optional(),
      account_type: Joi.string().optional(),
      faculty: Joi.string().optional(),
      dob: Joi.string().optional()

  })
  const {error, value} = body.validate(schema, {abortEarly: true})
   if(error) {
     throw { ok : false, status: StatusCodes.BAD_REQUEST, message: error.message};
   }
   return value;
}

export const loginSchema = async (payload: ILogin): Promise<ApiResponseType> => {
  const body = Joi.object({
    email : Joi.string().email().required(),
    password: Joi.string().required().min(8).max(10000)
  })
  const {error, value} = body.validate(payload, {abortEarly: true})
     if(error) {
      throw { ok : false, status: StatusCodes.BAD_REQUEST, message: error.message};
     }
     return value;
}
export const ForgottenPasswordSchema = async (payload: IChangePassword) => {
   const body = Joi.object({
      email : Joi.string().required()
   })
   const {error, value} = body.validate(payload, {abortEarly: true})
   if(error) {
    throw { ok : false, status: StatusCodes.BAD_REQUEST, message: error.message};
   }
   return value;
}

export const ResetPasswordSchema = async (payload: IForgotten) => {
    const body = Joi.object({
      email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
      code :  Joi.string().required(),
      NewPassword: Joi.string().required().min(8).max(10000000000),
      confirmPassword: Joi.ref("NewPassword")
    })
    const {error, value} = body.validate(payload, {abortEarly: true})
    if(error) {
     throw { ok : false, status: StatusCodes.BAD_REQUEST, message: error.message};
    }
    return value;
}