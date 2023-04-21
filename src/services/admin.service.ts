import { UserModel } from "../model/user.model";
import { IElevate, ROLE } from "../interface/user.interface";
import { StatusCodes } from "http-status-codes";
import messages from "../utils/messages";
import { ApiResponseType } from '../interface/api.interface';
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
  if(user.role == "ADMIN") {
    throw {
        ok : false,
        status: StatusCodes.BAD_REQUEST,
        message: messages.ALREADY_ADMIN
    }
  }
 await UserModel.update({role: "ADMIN"},{ where : { id : id }})
  return  {
    ok : true,
    status: StatusCodes.OK,
    message: messages.ELEVELATED_TO_ADMIN,
  }
}
