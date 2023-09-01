import {Router} from 'express'
import { authRoutes } from './auth.routes'
import { adminRouter } from './admin.routes'
import { userRoutes } from './user.routes'
import { ErrorMiddleware } from '../middleware/error/error'


export const IndexRoutes = Router()

IndexRoutes.use('/auth', authRoutes)
IndexRoutes.use('/admin', adminRouter)
IndexRoutes.use('/user', userRoutes)  
IndexRoutes.use(ErrorMiddleware) 