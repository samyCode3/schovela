import { UserModel } from "../../model/user.model";
import { IElevate } from "../../interface/admin.interface";
import { ROLE } from "../../interface/enum/enum";
import { StatusCodes } from "http-status-codes";
import messages from "../../utils/messages";
import { ApiResponseType } from '../../interface/api.interface';

export const ElevateUser = async (payload: IElevate): Promise<ApiResponseType> => {
  const id = payload.id
  let user = await UserModel.findOne({ where : { id: id }})
  if(!user) {
    throw {
        ok : false,
        status: StatusCodes.NOT_FOUND,
        message: messages.USER_NOT_FOUND
    }
  }
  if(user.role == ROLE.admin) {
    throw {
        ok : false,
        status: StatusCodes.BAD_REQUEST,
        message: messages.ALREADY_ADMIN
    }
  }
 await UserModel.update({role: ROLE.admin},{ where : { id : id }})
  return  {
    ok : true,
    status: StatusCodes.OK,
    message: messages.ELEVELATED_TO_ADMIN,
    body : {}
  }
}

export const ElevateUserToModerator = async (payload: IElevate) => {
    const {id} = payload
    const user = await UserModel.findOne({ where : {id}})
    if(!user) {
      throw {
        ok : false,
        status: StatusCodes.NOT_FOUND,
        message: messages.USER_NOT_FOUND
    }
    }
    await UserModel.update({role: ROLE.moderator},{ where : {id }})
    return  {
      ok : true,
      status: StatusCodes.OK,
      message: messages.ELEVELATED_TO_MODERATOR,
      body : {}
    }
 }


 export const De_elevateModerator = async (payload: IElevate) => {
  const {id} = payload
  const user = await UserModel.findOne({ where : {id}})
  if(!user) {
    throw {
      ok : false,
      status: StatusCodes.NOT_FOUND,
      message: messages.USER_NOT_FOUND
  }
  }
  await UserModel.update({role: ROLE.user},{ where : { id }})
  return  {
    ok : true,
    status: StatusCodes.OK,
    message: messages.DE_ELEVELATED_TO_USER,
    body : {}
  }
 }
