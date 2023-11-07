import { StatusCodes } from 'http-status-codes'
import { createPost } from '../../interface'
import { IUser } from '../../interface/user.interface'
import * as Post from '../../resources/postResources'
import { PostModel } from '../../model/post.model'
import messages from '../../utils/messages'
import { ApiResponseType } from '../../interface/api.interface'
import { ROLE } from '../../interface/enum/enum'
import { uploadFileFromBase64 } from '../../utils/file'
import { replaceAll } from '../../utils/string'


export const createPostService = async (payload: createPost, user: IUser) : Promise<ApiResponseType> => {
       let { id } = user.data

       const searchDuplicate = await PostModel.findOne({ where : { title : payload.title } });

       if(searchDuplicate){
              throw { ok : false, message : messages.DUPLICATE_TITLE, status : StatusCodes.BAD_REQUEST };
       }

       const dbPayload : any = payload;
       
       if(user.data.role == ROLE.admin || user.data.tole == ROLE.moderator){
              dbPayload.live = true;
       }

       try{
              dbPayload.attachment = uploadFileFromBase64(`content-${id}-${replaceAll(payload.title.toLowerCase(), ' ', '-')}`, payload.attachment_ext, payload.attachment);
       }catch(error){
              throw { ok : false, message : messages.INTERNAL_SERVER_ERROR, status : StatusCodes.INTERNAL_SERVER_ERROR };
       }

       const create_post = await Post.default.create({ ...dbPayload, UserId: id })
              .then((post: any) => {
                     return { ok: true, status: StatusCodes.OK, message: "Success", body: { post } }
              })
              .catch((error: any) => {
                     throw {
                            ok: false, status: StatusCodes.BAD_REQUEST, message: { error: error.message }
                     }
              })
       return create_post
}

export const getAllPostService = async () => {
       const posts = await Post.default.get()
              .then((post: any) => {
                     return { ok: true, status: StatusCodes.OK, message: "Success", body: { post } }
              })
              .catch((error: any) => {
                     throw {
                            ok: false, status: StatusCodes.BAD_REQUEST, message: { error: error.message }
                     }
              })
       return posts
}

export const getPostService = async (id: number) => {
       const getPostId = await Post.default.getById(id)
              .then((post: any) => {
                     return { ok: true, status: StatusCodes.OK, message: "Success", body: { post } }
              })
              .catch((error: any) => {
                     throw {
                            ok: false, status: StatusCodes.BAD_REQUEST, message: { error: error.message }
                     }
              })
       return getPostId
}


export const getAllPostByIdService = async (user: IUser) => {
       let { id } = user
       let userId = id
       const posts = await Post.default.getAllPostbyId(userId)
              .then((post: any) => {
                     return { ok: true, status: StatusCodes.OK, message: "Success", body: { post } }
              })
              .catch((error: any) => {
                     throw {
                            ok: false, status: StatusCodes.BAD_REQUEST, message: { error: error.message }
                     }
              })
       return posts

}