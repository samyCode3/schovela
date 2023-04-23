import * as express from 'express'
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
const api = `/api/auth`;

export const router = async (router: any) => {
    router.get('/', (req, res, next) => {
         return res.send("Happy coding")
    })
    router.post(`${api}/create`, registerController)
    router.post(`${api}/login`, LoginUserController) 
    router.post(`${api}/verify`, NotVerifiedUser, VerifyUserAccountController)
    router.post(`${api}/refresh`, NotVerifiedUser, RefreshToken)
    router.patch(`${api}/resend`, NotVerifiedUser, ResendUserOtp)
    router.patch(`${api}/forgot`, ForgottenPasswordController)
    router.post(`${api}/change/password`, ResetController)
}

 