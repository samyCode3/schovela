import * as Joi from 'joi'
import {
 StatusCodes
} from 'http-status-codes'
import { ApiResponseType } from '../../interface/api.interface';
import { createPost } from '../../interface';
import { attachment_exts, levels } from '../../interface/enum/enum';

export const createPostSchema = (body : any): Promise<createPost> => {
      const schema = Joi.object({
           title : Joi.string().required(),
           desc : Joi.string().required(),
           level : Joi.any().required().valid(...Object.values(levels)),
           faculty : Joi.string().required(),
           dept : Joi.string().required(),
           attachment : Joi.string().required().base64(),
           attachment_ext : Joi.any().required().valid(...Object.values(attachment_exts)),
      })
      const {error, value} = schema.validate(body, {abortEarly: false})
      if(error) {
        throw { ok : false, status: StatusCodes.BAD_REQUEST, message: error.message};
      }
      return value;
}
