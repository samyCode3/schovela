import {Router} from 'express'
import {
     registerController,
     VerifyUserAccountController, 
     LoginUserController,
     UserInfosController,
     ForgottenPasswordController,
     ResetController,
     ResendUserOtp
   
    } from '../controller/auth.controller'
import { NotVerifiedUser, RefreshToken } from '../middleware/auth'
export const authRoutes = Router()

    authRoutes.get('/', (req, res, next) => {
         return res.send("Happy coding")
    })
    authRoutes.post(`/create`, registerController)
    authRoutes.post(`/login`, LoginUserController) 
    authRoutes.post(`/verify`, NotVerifiedUser, VerifyUserAccountController)
    authRoutes.post(`/refresh`, NotVerifiedUser, RefreshToken)
    authRoutes.patch(`/resend`, NotVerifiedUser, ResendUserOtp)
    authRoutes.patch(`/forgot`, ForgottenPasswordController)
    authRoutes.post(`/change/password`, ResetController)


 