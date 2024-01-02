import {NextFunction} from 'express'
import { 
    getProfileImage, 
    updateProfile, 
 
} from '../services/index.service'
import { UpdateProfileValidation } from '../utils/validation/index.joi'


export const UpdateProfileController =async (req: Request | any, res : Response | any, next : NextFunction) => {
    let {user, body} = req
    try {
       let payload = await UpdateProfileValidation(body)
       let profile = await updateProfile(payload, user)
       return res.status(200).json({...profile})
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


