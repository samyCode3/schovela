import * as express from 'express'
import {registerController, VerifyUserAccount, LoginUserController, UserInfos} from '../controller/user.controller'
import { NotVerifiedUser, VerifiedUser } from '../middleware/auth'
const api = `/api`

export const router = async (router: any) => {
    router.get('/', (req, res, next) => {
         return res.send("Happy coding")
    })
    router.post(`${api}/create`, registerController, (req, res, next) =>{})
    router.post(`${api}/user/verify`, NotVerifiedUser, VerifyUserAccount, (req, res, next) =>{}) 
    router.post(`${api}/user/data`,  VerifiedUser,UserInfos, (req, res, next) =>{
         res.json(req.user)
    }) 
    router.post(`${api}/user/login`, LoginUserController, VerifiedUser, (req, res, next) =>{}) 
}

