import { StatusCodes } from "http-status-codes";
import { ProfileModel } from "../model/profile.model";
import { UserModel } from "../model/user.model";
import { getById, DeleteById, create, updateOne, getByuserId, DeleteByUserId} from "../utils";
import { IProfile, IFile, ProfileId } from "../interface/dashboard.interface";
import * as fs  from "fs";
import { IUser } from "../interface/user.interface";


export const UploadProfile = async (payload: IProfile, file: IFile, user: IUser) => {
    let {id} = user.data
    let upload: any
    let {profile_img} = file
    profile_img = file.filename
    let path = file.path
    let userId = id
    await DeleteById(userId, ProfileModel)
    upload = await create({...payload, profile_img, path, userId}, ProfileModel)
    if(!upload) {
        fs.unlinkSync(file.path)
    }
    return {
        ok: true,
        status: StatusCodes.OK,
        message : "Success",
        body : {upload}
    }
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

export const updateProfile = async (payload: IProfile, file: IFile, user: IUser) => {
    const {id} = user
    const {bio} = payload
    let userId = id
    let profile = await getByuserId(userId, ProfileModel)
    if(profile) {
        await updateOne({bio, file}, userId, ProfileModel)
    }
    
    return {
        ok : true,
        status : StatusCodes.OK,
        message : "Sucess",
        body : {}
       }
}

export const deleteProfile = async ( user: IUser) => {
    const {id} = user.data
    let userId = id 
     await DeleteByUserId(userId, ProfileModel)
     return {
        ok : true,
        status : StatusCodes.OK,
        message : "Sucess",
        body : {}
       }
}