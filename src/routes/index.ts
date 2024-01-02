import {Router} from 'express'
import { authRoutes } from './auth.routes'
import { adminRouter } from './admin.routes'
import { userRoutes } from './user.routes'
import { ErrorMiddleware } from '../middleware/error/error'
import { postRoutes } from './post.routes'
import { analyticRoutes } from './analytic.routes'
import { dashboardRoutes } from './dashboard.routes'


export const IndexRoutes = Router()

IndexRoutes.use('/auth', authRoutes)
IndexRoutes.use('/admin', adminRouter)
IndexRoutes.use('/user', userRoutes)
IndexRoutes.use('/post', postRoutes)
IndexRoutes.use('/analytic', analyticRoutes)
IndexRoutes.use('/dashboard', dashboardRoutes)
IndexRoutes.use(ErrorMiddleware)
 