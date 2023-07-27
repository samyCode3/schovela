import { StatusCodes } from "http-status-codes"
import {Op} from 'sequelize'
import { UserModel } from "../../model/user.model"
import messages from "../../utils/messages"
import { IElevate, Ifilter } from "../../interface/admin.interface"


export const total_number_of_user = async () => {
    const total_user = await UserModel.count()
    return {
        ok : true,
        status: StatusCodes.OK,
        message  : messages.USER_RECORD,
        body : {total_user}
    }
}

export const get_all_user = async () => {
    const user = await UserModel.findAll({ where : {
         status : {  [Op.not] : false },
         role : { [Op.ne] : 'admin'}
    }})
    if(user.length === 0) {
       throw {
         ok : true,
         status :  StatusCodes.NOT_FOUND,
         message : messages.NO_USERS_FOUND
       }
    }
   return {
    ok : true,
    status: StatusCodes.OK,
    message  : messages.USER_RECORD,
    body : {user}
   }
}
export const getByFilter = async (payload: Ifilter) => {
    const {role} = payload
    const user = await UserModel.findAll({where : { role, 
         status : {
            [Op.not] : false
         }
    }})
    if(user.length == 0) {
     const users =  await UserModel.findAll({
        where :  { role : {  [Op.ne] : 'admin'  },
        status : { [Op.not] : false}}
     })
        return {
            ok : true,
            status: StatusCodes.OK,
            message  : messages.USER_RECORD,
            body : {users}
        }
       
    }
   return {
    ok : true,
    status: StatusCodes.OK,
    message  : messages.USER_RECORD,
    body : {user}
   }
}


export const getUserById = async(payload : IElevate) => {
   const {id} = payload
   const user = await UserModel.findOne({ where : {id}})
 return {
    ok : true,
    status: StatusCodes.OK,
    message  : messages.USER_RECORD,
    body : {user}
   }
}