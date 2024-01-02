import { StatusCodes } from "http-status-codes";
import { ProfileModel } from "../model/profile.model";
import { UserModel } from "../model/user.model";
import { getById, DeleteById, create, updateOne, getByuserId, DeleteByUserId} from "../utils";
import { IProfile, IFile, ProfileId } from "../interface/dashboard.interface";
import * as fs  from "fs";
import { IUser, ROLE } from "../interface/user.interface";
import { Op, where } from "sequelize";
import { PostModel } from "../model/post.model";
import { ViewModel } from "../model/view.model";
import { ApiResponseType } from "../interface/api.interface";


export const updateProfile = async (payload: IProfile, user: IUser) => {
    const {id} = user.data
    const {level, profile_img} = payload
    let user_profile = await UserModel.findOne({ where: { id } });

    if (!user_profile) {
        throw {
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            message: `Unable to find user with this id => ${id}`
        };
    }

    await UserModel.update({ level, profile_img }, { where: { id } });

    // Fetch the updated user profile after the update
    user_profile = await UserModel.findOne({ where: { id } });

    if (!user_profile) {
        throw {
            ok: false,
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: `Failed to fetch updated profile for user with id => ${id}`
        };
    }

    return {
        ok: true,
        status: StatusCodes.OK,
        message: `Profile was updated successfully`,
        body: { user_profile }
    };
    

 }

export const getProfileImage = async (user: any) => {
    
   let {id} = user.data
   let userId = id
   let profile = await getByuserId(userId, ProfileModel)
   return {
    ok : true,
    status : StatusCodes.OK,
    message : "Sucess",
    body : {profile}
   }
}



