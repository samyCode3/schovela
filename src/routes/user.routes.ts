import {Router} from 'express'
import {
     UserInfosController,   
    } from '../controller/auth.controller'
import {AuthUser, VerifiedUser } from '../middleware/auth'
   export  const userRoutes = Router()
    userRoutes.use(AuthUser)
    userRoutes.post(`/data`, VerifiedUser, UserInfosController) 
   


 