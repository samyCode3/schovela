import { StatusCodes } from "http-status-codes"
import {Op} from 'sequelize'
import { UserModel } from "../../model/user.model"
import messages from "../../utils/messages"
import { FilterUsersType, IElevate, Ifilter } from "../../interface/admin.interface"
import { PostModel } from "../../model/post.model"
import { ROLE } from "../../interface/user.interface"


export const total_number_of_user = async () => {
    const total_user = await UserModel.count({ where : { role : {  [Op.not] : ROLE.admin } } });
    const total_content = await PostModel.count()
    return {
        ok : true,
        status: StatusCodes.OK,
        message  : messages.USER_RECORD,
        body : {total_user, total_content}
    }
}

export const get_all_user = async (payload : FilterUsersType) => {
   let where : any = {
      status : {  [Op.not] : false }
   };

   if(payload.role){
      where.role = payload.role
   }

   const attributes = ['id', 'fullname', 'createdAt', 'email'];

   const users = await UserModel.findAll({ attributes, where, order : [['id', 'DESC']], offset : payload.page, limit : 20 });
    
   return {
    ok : true,
    status: StatusCodes.OK,
    message  : messages.USER_RECORD,
    body : {users}
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