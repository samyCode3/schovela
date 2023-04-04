import * as express from 'express'
import {registerController, VerifyUserAccount, LoginUserController, UserInfos} from '../controller/auth'
import { NotVerifiedUser, VerifiedUser } from '../middleware/auth'
const api = `/api`

export const router = async (router: any) => {
    router.get('/', (req, res, next) => {
         return res.send("Happy coding")
    })
    router.post(`${api}/create`, registerController, (req, res, next) =>{})
    router.post(`${api}/auth/verify`, NotVerifiedUser, VerifyUserAccount, (req, res, next) =>{}) 
    router.post(`${api}/auth/data`,  VerifiedUser,UserInfos, (req, res, next) =>{}) 
    router.post(`${api}/login`, LoginUserController, (req, res, next) =>{}) 
}

