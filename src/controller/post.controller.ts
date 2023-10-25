import { NextFunction } from "express";
import { createPostService, getPostService, getAllPostService, getAllPostByIdService} from "../services/post/index.post";


export default  {
    createPostController : async (req : Request | any, res : Response | any, next : NextFunction) => {
         const {user, body, url} = req
         try {
              const post = await createPostService(body, user)
              return res.status(post.status).json({...post})
         } catch (error) {
            next(error)
         }
    },

    getAllcontroller : async (req : Request | any, res : Response | any, next : NextFunction) => {
      const {user, body, url} = req
      try {
           const post = await getAllPostService()
           return res.status(post.status).json({...post})
      } catch (error) {
         next(error)
      }
    },

    getPostControllerById :  async (req : Request | any, res : Response | any, next : NextFunction) => {
     const {user, params, body, url} = req
     try {
            const post = await getPostService(params.id)
            return res.status(post.status).json({...post})
     } catch (error) {
        next(error)
     }
    },

    getAllPostByIdController :async (req : Request | any, res : Response | any, next : NextFunction) => {
      const {user, body, url} = req
      try {
             const post = await getAllPostByIdService(user)
             return res.status(post.status).json({...post})
      } catch (error) {
         next(error)
      }
    }
}