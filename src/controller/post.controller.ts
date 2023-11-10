import { NextFunction } from "express";
import { createPostService, editPostService, hidePostService, getPostService, getAllPostService, getAllPostByIdService } from "../services/post/index.post";
import { createPostSchema, editPostSchema, filterPostValidation, hidePostSchema } from "../utils/validation/post.joi";


export default {
   hidecontroller : async (req: Request | any, res: Response | any, next: NextFunction) => {
      const { user, body, url } = req
      try {
         const payload = await hidePostSchema(body);
         const post = await hidePostService(payload, user)
         return res.status(post.status).json({ ...post })
      } catch (error) {
         next(error)
      }
   },
   editPostController: async (req: Request | any, res: Response | any, next: NextFunction) => {
      const { user, body, url } = req
      try {
         const payload = await editPostSchema(body);
         const post = await editPostService(payload, user)
         return res.status(post.status).json({ ...post })
      } catch (error) {
         next(error)
      }
   },
   createPostController: async (req: Request | any, res: Response | any, next: NextFunction) => {
      const { user, body, url } = req
      try {
         const payload = await createPostSchema(body);
         const post = await createPostService(payload, user)
         return res.status(post.status).json({ ...post })
      } catch (error) {
         next(error)
      }
   },

   getAllcontroller: async (req: Request | any, res: Response | any, next: NextFunction) => {
      const { user, query, url } = req
      try {
         let payload = await filterPostValidation(query)
         const post = await getAllPostService(payload, user)
         return res.status(post.status).json({ ...post })
      } catch (error) {
         next(error)
      }
   },

   getPostControllerById: async (req: Request | any, res: Response | any, next: NextFunction) => {
      const { user, params, body, url } = req
      try {
         const payload = await hidePostSchema(params);
         const post = await getPostService(payload.id)
         return res.status(post.status).json({ ...post })
      } catch (error) {
         next(error)
      }
   },

   getAllPostByIdController: async (req: Request | any, res: Response | any, next: NextFunction) => {
      const { user, body, url } = req
      try {
         const post = await getAllPostByIdService(user)
         return res.status(post.status).json({ ...post })
      } catch (error) {
         next(error)
      }
   }
}