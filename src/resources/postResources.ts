import * as Post from "./resource"
import { PostModel } from '../model/post.model'
import { createPost } from '../interface'
import { StatusCodes } from "http-status-codes"
import { FindOptions } from "sequelize"
type PostModel =any
export default {
     create : async (payload: createPost) => { 
          let {files, description, category, binaryData, content} = payload
           const create_post = await Post.default.create({...payload}, PostModel)
           return create_post
     },
     get : async () => {
          let options : any = {
              limit: 10,
              attributes : ['id', 'title', 'content', 'category', 'createdAt', 'updatedAt', 'files', 'userId']
          }
          let posts = await Post.default.get(PostModel, options)
          return posts
     },
     getById :  async (id : number) => {  
          let options : any = {
               limit: 10,
               attributes : ['id', 'title', 'content', 'category', 'createdAt', 'updatedAt', 'files']
           }
          const postById = await Post.default.getByIds({id},PostModel,options)
          return postById
     },
     getAllPostbyId : async (userId : number) => {
          let options : any = {
               limit: 10,
               attributes : ['id', 'title', 'content', 'category', 'createdAt', 'updatedAt', 'files', 'userId']
           }
            const posts = await Post.default.getAllByIds({userId},PostModel, options)
            return posts
     }
}