import * as Post from "./resource"
import { PostModel } from '../model/post.model'
import { createPost } from '../interface'
import { StatusCodes } from "http-status-codes"
type PostModel =any
export default {
     create : async (payload: createPost, post: PostModel) => { 
          let {files, description, category, binaryData, content} = payload
           const create_post = await Post.default.create({...payload}, post)
           return create_post
     },

     getById :  async (userId : number, post: PostModel) => {  

          const postById = await Post.default.getByUserId(userId, post)

          return postById
     }
}