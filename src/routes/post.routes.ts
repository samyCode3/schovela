import {Router} from 'express'
import * as PostController from '../controller/post.controller'
import { AuthUser } from '../middleware/auth'

export const postRoutes = Router()

postRoutes.post('/', AuthUser, PostController.default.createPostController)
postRoutes.get('/', AuthUser, PostController.default.getPostControllerById)
