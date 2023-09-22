import * as Joi from 'joi'
import {
 StatusCodes
} from 'http-status-codes'
import { ApiResponseType } from '../../interface/api.interface';
import { IFile } from '../../interface/dashboard.interface';
export const UploadFileValidation = async (payload: IFile) => {
      const body = Joi.object({
        fieldname: Joi.string().valid('profile_img').required().regex(/^data:profile_img\/(jpeg|jpg|png);base64,/) ,
        originalname: Joi.string().required(),
        destination: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/mp4', 'image/pdf').required(),
      }).unknown()
      const {error, value} = body.validate(payload, {abortEarly: true})
      if(error) {
        throw { ok : false, status: StatusCodes.BAD_REQUEST, message: error.message};
      }
      return value;
}
