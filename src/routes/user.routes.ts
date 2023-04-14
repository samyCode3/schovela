import * as express from 'express'
import {
     UserInfosController,   
    } from '../controller/auth'
import { NotVerifiedUser, VerifiedUser } from '../middleware/auth'
const api = `/api`

export const UserRouter = async (router: any) => {
    router.use(NotVerifiedUser)
    router.post(`${api}/user/data`, VerifiedUser, UserInfosController, (req, res, next) =>{}) 
   
}

 