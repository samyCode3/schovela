import {Router} from 'express'
import { getProfileImageController,UpdateProfileController} from '../controller/index.controller'
import { AuthUser } from '../middleware/auth'

export const dashboardRoutes =  Router()

dashboardRoutes.post('/profile', AuthUser,  UpdateProfileController) 
dashboardRoutes.get('/image', AuthUser, getProfileImageController) 

// dashboardRoutes.get('/analytics', AnalyticsController)   
                                                            