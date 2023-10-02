import { StatusCodes } from 'http-status-codes'
import { createPost } from '../../interface'
import { IUser } from '../../interface/user.interface'
import { PostModel } from '../../model/post.model'
import * as Post from '../../resources/postResources'


export const createPostService = async (payload: createPost, user: IUser) => {
       let {id} = user.data
       const create_post = await Post.default.create({...payload, userId : id}, PostModel)
       .then((post : any) => { return { ok: true, status :StatusCodes.OK, message  : "Success", body : {post}}
       })
       .catch((error: any) => {
      throw { ok:  false, status: StatusCodes.BAD_REQUEST, message: {error:  error.message}
      }
  })
       return create_post
}

export const getPostService = async (user: IUser) => {
       let {id} = user.data
       console.log(id)
       let userId = id
       const getPostId = await Post.default.getById(userId, PostModel)
       .then((post: any) => {
              return { ok: true, status :StatusCodes.OK, message  : "Success", body : {post}}
       })
       .catch((error : any) =>{
              throw {
                     ok:  false, status: StatusCodes.BAD_REQUEST, message: {error:  error.message}
              }
       })
       return getPostId
}