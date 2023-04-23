import * as Joi from 'joi'
import { StatusCodes} from 'http-status-codes'
import { ApiResponseType } from '../../interface/api.interface';
import { IElevate} from '../../interface/admin.interface'

export const ElevateValidation  = (payload : IElevate): Promise<ApiResponseType>=> {
    const body = Joi.object({
        id : Joi.number().required()
    })
    const {error, value} = body.validate(payload, { abortEarly : false})
    if(error) {
        throw {
            ok : false,
            status: StatusCodes.BAD_REQUEST,
            messgage: error.message
        }
    }
    return value
}