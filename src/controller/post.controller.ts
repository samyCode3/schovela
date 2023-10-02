import { NextFunction } from "express";
import { createPostService, getPostService } from "../services/post/index.post";


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

    getPostControllerById :  async (req : Request | any, res : Response | any, next : NextFunction) => {
     const {user, body, url} = req
     console.log(user)
     try {
            const post = await getPostService(user)
            return res.status(post.status).json({...post})
     } catch (error) {
        next(error)
     }
    }
}