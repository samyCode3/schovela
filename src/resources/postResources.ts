import * as Post from "./resource"
import { PostModel } from '../model/post.model'
import { createPost } from '../interface'
import { StatusCodes } from "http-status-codes"
import { FindOptions } from "sequelize"
type PostModel = any

const attributes = ['id', 'title', 'desc', 'level', 'faculty', 'attachment', 'attachment_ext', 'dept', 'createdAt', 'updatedAt', 'UserId'];

export default {
     create: async (payload: any) => {
          const create_post = await Post.default.create({ ...payload }, PostModel)
          return create_post
     },
     edit : async (id : number, data : any) =>{
          await PostModel.update(data, { where : { id } });
          return await PostModel.findOne({ where : { id } });
     },
     get: async () => {
          let options: any = {
               limit: 10,
               attributes
          }
          let posts = await Post.default.get(PostModel, options)
          return posts
     },
     getById: async (id: number) => {
          let options: any = {
               limit: 10,
               attributes
          }
          const postById = await Post.default.getByIds({ id }, PostModel, options)
          return postById
     },
     getAllPostbyId: async (userId: number) => {
          let options: any = {
               limit: 10,
               attributes
          }
          const posts = await Post.default.getAllByIds({ userId }, PostModel, options)
          return posts
     }
}