import {Router} from 'express'
import { UploadProfileController, getProfileImageController, deleteProfileController} from '../controller/index.controller'
import { AuthUser } from '../middleware/auth'

export const dashboardRoutes =  Router()

dashboardRoutes.post('/image/upload', AuthUser,  UploadProfileController) 
dashboardRoutes.get('/image', AuthUser, getProfileImageController)
dashboardRoutes.delete('/image', AuthUser, deleteProfileController)
// dashboardRoutes.get('/analytics', AnalyticsController)   
                                                            