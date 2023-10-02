import * as Joi from 'joi'
import {
 StatusCodes
} from 'http-status-codes'
import { ApiResponseType } from '../../interface/api.interface';
import { createPost } from '../../interface';
export const registerSchema = (payload: createPost): Promise<ApiResponseType> => {
      const body = Joi.object({
           title : Joi.string().required(),
           files : Joi.array().required(),
           category :  Joi.string().required(),
           description :  Joi.string().required()
      })
      const {error, value} = body.validate(payload, {abortEarly: false})
      if(error) {
        throw { ok : false, status: StatusCodes.BAD_REQUEST, message: error.message};
      }
      return value;
}
