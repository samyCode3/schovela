import {Router} from 'express'
import { authRoutes } from './auth.routes'
import { adminRouter } from './admin.routes'
import { userRoutes } from './user.routes'


export const IndexRoutes = Router()

IndexRoutes.use('/auth', authRoutes)
IndexRoutes.use('/admin', adminRouter)
IndexRoutes.use('/user', userRoutes)