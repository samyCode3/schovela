import {Router} from 'express'
import {
     UserInfosController,   
    } from '../controller/auth.controller'
import { NotVerifiedUser, VerifiedUser } from '../middleware/auth'
   export  const userRoutes = Router()
    userRoutes.use(NotVerifiedUser)
    userRoutes.post(`/data`, VerifiedUser, UserInfosController) 
   


 