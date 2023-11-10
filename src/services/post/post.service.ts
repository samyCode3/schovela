import { StatusCodes } from 'http-status-codes'
import { createPost, editPost, hidePost } from '../../interface'
import { IUser } from '../../interface/user.interface'
import * as Post from '../../resources/postResources'
import { PostModel } from '../../model/post.model'
import messages from '../../utils/messages'
import { ApiResponseType } from '../../interface/api.interface'
import { ROLE } from '../../interface/enum/enum'
import { deleteUpload, uploadFileFromBase64 } from '../../utils/file'
import { replaceAll } from '../../utils/string'
import { FilterPostInterface } from '../../interface/post.interface'
import { UserModel } from '../../model/user.model'
import { Op } from 'sequelize'

export const isDuplicate = async (title : string) : Promise<void> =>{
       const searchDuplicate = await PostModel.findOne({ where : { title } });

       if(searchDuplicate){
              throw { ok : false, message : messages.DUPLICATE_TITLE, status : StatusCodes.BAD_REQUEST };
       }
}

export const postPermission = async (id : number, user : IUser) : Promise<any> =>{
       const post = (await getPostService(id)).body.post;
       
       if(user.data.role !== ROLE.admin && user.data.role !== ROLE.moderator){
              if(user.data.id !== post.UserId){
                     throw { ok : false, message : messages.UNAUTHORIZED, status : StatusCodes.UNAUTHORIZED };
              }
       }

       return post;
}

export const hidePostService = async (payload : hidePost, user : IUser) : Promise<ApiResponseType> =>{
       const { id } = payload;
       const oldPost = await postPermission(id, user);

       let live : boolean;

       if(oldPost.live){
              live = false;
       }else{
              live = true;
       }

       const edit_post = await Post.default.edit(id, { live })
              .then((post: any) => {
                     return { ok: true, status: StatusCodes.OK, message: "Success", body: { post } }
              })
              .catch((error: any) => {
                     throw {
                            ok: false, status: StatusCodes.BAD_REQUEST, message: { error: error.message }
                     }
              })
       return edit_post
}

export const editPostService = async (payload : editPost, user : IUser) : Promise<ApiResponseType> =>{
       let { id } = payload;
       const oldPost = await postPermission(id, user);

       const fillables = Object.keys(payload);
       const updatePayload : any = {};

       for(let i = 0; i < fillables.length; i++){
              let key = fillables[i]

              if(key === "title"){
                     await isDuplicate(payload.title);
              }

              if(key === "attachment"){
                     payload.attachment = uploadFileFromBase64(`content-${user.data.id}-${replaceAll(oldPost['title'].toLowerCase(), ' ', '-')}`, payload.attachment_ext, payload.attachment);
              }

              if(key !== "id"){
                     updatePayload[key] = payload[key];
              }
       }


       const edit_post = await Post.default.edit(id, updatePayload)
              .then((post: any) => {
                     if(payload.attachment){
                            deleteUpload(oldPost['attachment']);
                     }

                     return { ok: true, status: StatusCodes.OK, message: "Success", body: { post } }
              })
              .catch((error: any) => {
                     throw {
                            ok: false, status: StatusCodes.BAD_REQUEST, message: { error: error.message }
                     }
              })
       return edit_post
}

export const createPostService = async (payload: createPost, user: IUser) : Promise<ApiResponseType> => {
       let { id } = user.data;

       await isDuplicate(payload.title)

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
 
export const getAllPostService = async (payload: FilterPostInterface, user: IUser) => {
       let {id} = user.data
       let {level, faculty, dept, live, limit, offset, search } = payload
       if(offset > 0){
              offset = offset * limit;
          }
       let post : any
       let where : any = {}
       if(search) {
              where = {
                     [Op.or]: [
                       { title: { [Op.like]: `%${search}%` } },
                       { desc: { [Op.like]: `%${search}%` } },
                     ],
                   }
       } else {
              let user_in = await UserModel.findOne({where: {id}}) 
       
              if(level) {
                     where = {level, live} 
              }
              if(faculty) {  
                     where = {faculty, live}
              }
              if(dept) { 
                     where = {dept, live}
              } 
              if(!(faculty || search || level || dept)) {
                     where = {[Op.and] : [{faculty : user_in.faculty}]}
              }
       }
       
    
      
       let count = await PostModel.count({ where });
       let total_pages = Math.ceil(count / limit);
       post = await PostModel.findAll({where, limit, offset, order: [['id', 'DESC']], include: [UserModel]})
    
       return {
              ok: true,
              status: StatusCodes.OK,
              message: `Data Retrived`,
              body: {post, total_pages, limit} 
       }
}

export const getPostService = async (id: number) => {
       const getPostId = await Post.default.getById(id)
              .then((post: any) => {
                     if(post === null){
                            throw {
                                   ok: false, status: StatusCodes.NOT_FOUND, message: messages.POST_NOT_FOUND
                            }
                     }
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