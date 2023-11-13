import { NextFunction } from "express";
import { ViewPostsService } from "../services/post/views.service";


export const ViewPostController = async (req: Request | any, res: Response | any, next: NextFunction) => {
    let {user, params} = req 
    let userAgent = req.headers['user-agent']
    let ipAddress = req.ip
     try {
     const users = await ViewPostsService(params.postId, ipAddress,userAgent, user)
     return res.status(users.status).json({...users})
     } catch(error: any) {
       next(error)
     }
}