import {Router} from 'express'
import * as PostController from '../controller/post.controller'
import { AuthUser, IsAdmin } from '../middleware/auth'

export const postRoutes = Router()

postRoutes.post('/', AuthUser, PostController.default.createPostController)
postRoutes.patch('/', AuthUser, PostController.default.editPostController)
postRoutes.get('/', AuthUser, PostController.default.getAllcontroller)
postRoutes.get('/:id', AuthUser, PostController.default.getPostControllerById)
// postRoutes.get('/admin/uploaded', AuthUser, IsAdmin,PostController.default.getAllPostByIdController)
