import * as Joi from 'joi'
import {
 StatusCodes
} from 'http-status-codes'
import { ApiResponseType } from '../../interface/api.interface';
import { IProfile } from '../../interface/dashboard.interface';
import { levels } from '../../interface/enum/enum';


export const UpdateProfileValidation =async (payload: IProfile) : Promise<IProfile>=> {
  const body = Joi.object({
    profile_img : Joi.string().optional(),
    level: Joi.string().optional().valid(...Object.values(levels))
})
const {error, value} = body.validate(payload, { abortEarly : true})
if(error) {
    throw {
        ok : false,
        status: StatusCodes.BAD_REQUEST,
        message: error.message
    }
}
return value
}