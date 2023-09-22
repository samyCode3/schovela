import {Router} from 'express'
import { UploadProfileController, getProfileImageController, deleteProfileController } from '../controller/index.controller'
import { AuthUser } from '../middleware/auth'
import { upload } from '../middleware/multer'

export const dashboardRoutes =  Router()

dashboardRoutes.post('/image/upload', upload.single('profile_img'), AuthUser,  UploadProfileController) 
dashboardRoutes.get('/image', AuthUser, getProfileImageController)
dashboardRoutes.delete('/image', AuthUser, deleteProfileController)
 