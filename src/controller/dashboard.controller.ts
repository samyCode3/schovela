import {NextFunction} from 'express'
import { 
    UploadProfile, 
    getProfileImage, 
    updateProfile, 
    deleteProfile 
} from '../services/index.service'
import { UploadFileValidation } from '../utils/validation/index.joi'
export const UploadProfileController = async (req: Request | any, res : Response | any, next : NextFunction) => {
    let {user, body, file} = req
    try {
       let profile = await UploadFileValidation(file)
       profile = await UploadProfile(body, profile, user)
       return res.status(profile.status).json({...profile})
    } catch (error) {
        let err = new Error(error)
        console.log(`${err}`)
        next(error)
     
    }
}

export const getProfileImageController = async (req: Request | any, res : Response | any, next : NextFunction) => {
    let {user} = req
    try {
       let profile = await getProfileImage(user)
       return res.status(200).json({...profile})
    } catch (error) {
        let err = new Error(error)
        console.log(`${err}`)
        next(error)
     
    }
}
export const updateProfileController = async (req: Request | any, res : Response | any, next : NextFunction) => {
    let {body, file, user} = req
    try {
       let profile = await UploadFileValidation(file)
        profile = await updateProfile(body, profile, user)
       return res.status(profile.status).json({...profile})
    } catch (error) {
        let err = new Error(error)
        console.log(`${err}`)
        next(error)
     
    }
}

export const deleteProfileController = async (req: Request | any, res : Response | any, next : NextFunction) => {
    let {user} = req
    try {
       let profile = await deleteProfile(user)
       return res.status(profile.status).json({...profile})
    } catch (error) {
        let err = new Error(error)
        console.log(`${err}`)
        next(error)
     
    }
}