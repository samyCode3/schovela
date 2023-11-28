import {Router} from 'express'
import * as PostController from '../controller/post.controller'
import { AuthUser, IsAdmin } from '../middleware/auth'


export const postRoutes = Router()

postRoutes.post('/', AuthUser, PostController.default.createPostController)
postRoutes.patch('/', AuthUser, PostController.default.editPostController)
postRoutes.get('/', AuthUser, PostController.default.getAllcontroller)
postRoutes.post('/hide-unhide', AuthUser, PostController.default.hidecontroller)
postRoutes.get('/:id', AuthUser, PostController.default.getPostControllerById)
postRoutes.post('/download/:postId', AuthUser, PostController.default.downloadDocumentController)

// postRoutes.get('/admin/uploaded', AuthUser, IsAdmin,PostController.default.getAllPostByIdController)
