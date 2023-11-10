import * as Joi from 'joi'
import { StatusCodes} from 'http-status-codes'
import { ApiResponseType } from '../../interface/api.interface';
import { FilterUsersType, IElevate} from '../../interface/admin.interface'
import { ROLE } from '../../interface/enum/enum';

export const ElevateValidation  = (payload : IElevate): Promise<ApiResponseType>=> {
    const body = Joi.object({
        id : Joi.number().required()
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

export const filterUsersValidation = (body : any): FilterUsersType =>{
    const schema = Joi.object({
        role : Joi.any().valid(...Object.values(ROLE)).optional(),
        page : Joi.number().optional().default(0)
    });

    const {error, value} = schema.validate(body, { abortEarly : true})
    if(error) {
        throw {
            ok : false,
            status: StatusCodes.BAD_REQUEST,
            message: error.message
        }
    }
    return value
}