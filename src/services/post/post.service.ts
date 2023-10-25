import { StatusCodes } from 'http-status-codes'
import { createPost } from '../../interface'
import { IUser } from '../../interface/user.interface'
import * as Post from '../../resources/postResources'


export const createPostService = async (payload: createPost, user: IUser) => {
       let {id} = user.data
       const create_post = await Post.default.create({...payload, userId : id})
       .then((post : any) => { return { ok: true, status :StatusCodes.OK, message  : "Success", body : {post}}
       })
       .catch((error: any) => {
      throw { ok:  false, status: StatusCodes.BAD_REQUEST, message: {error:  error.message}
      }
  })
       return create_post
}

export const getAllPostService = async () => {
      const posts = await Post.default.get()
      .then((post: any) => {
       return { ok: true, status :StatusCodes.OK, message  : "Success", body : {post}}
})
      .catch((error : any) =>{
       throw {
              ok:  false, status: StatusCodes.BAD_REQUEST, message: {error:  error.message}
       }
})
    return posts
}

export const getPostService = async (id : number) => {
       const getPostId = await Post.default.getById(id)
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


export const  getAllPostByIdService = async (user: IUser) => {
     let {id} = user
     let userId = id 
     const posts = await Post.default.getAllPostbyId(userId)
     .then((post: any) => {
       return { ok: true, status :StatusCodes.OK, message  : "Success", body : {post}}
})
       .catch((error : any) =>{
              throw {
                     ok:  false, status: StatusCodes.BAD_REQUEST, message: {error:  error.message}
              }
       })
       return posts

}