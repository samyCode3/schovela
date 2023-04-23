import * as express from 'express'
import {
     UserInfosController,   
    } from '../controller/auth.controller'
import { NotVerifiedUser, VerifiedUser } from '../middleware/auth'
const api = `/api/user`

export const UserRouter = async (router: any) => {
    router.use(NotVerifiedUser)
    router.post(`${api}/data`, VerifiedUser, UserInfosController, (req, res, next) =>{}) 
   
}

 