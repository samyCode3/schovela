import * as express from 'express'
import {
     registerController,
     VerifyUserAccountController, 
     LoginUserController,
     UserInfosController,
     ForgottenPasswordController,
     ResetController,
     ResendUserOtp
   
    } from '../controller/auth'
import { NotVerifiedUser, VerifiedUser } from '../middleware/auth'
const api = `/api`

export const router = async (router: any) => {
    router.get('/', (req, res, next) => {
         return res.send("Happy coding")
    })
    router.post(`${api}/create`, registerController, (req, res, next) =>{})
    router.post(`${api}/login`, LoginUserController, (req, res, next) =>{}) 
    router.post(`${api}/auth/verify`, NotVerifiedUser, VerifyUserAccountController, (req, res, next) =>{}) 
    router.put(`${api}/auth/resend`, NotVerifiedUser, ResendUserOtp)
    router.post(`${api}/forgot`, ForgottenPasswordController, (req, res, next) => {})
    router.put(`${api}/change/password`, ResetController, (req, res, next) => {} )
}

 