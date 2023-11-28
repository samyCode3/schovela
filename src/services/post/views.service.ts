import { StatusCodes } from "http-status-codes";
import { IUser } from "../../interface/user.interface"
import { PostModel } from "../../model/post.model";
import { ViewModel } from "../../model/view.model";
import { Op } from "sequelize";
import { ApiResponseType } from "../../interface/api.interface";

export const ViewPostsService = async (postId: number, ipAddress: string, userAgent: string, user?: IUser): Promise<ApiResponseType> => {
   let { id, role } = user.data;

   let views : any
   let total_views: any
   let post = await PostModel.findOne({where: {id : postId}})
  

   if(!post) {
      throw {
         ok: false,
         status: StatusCodes.NOT_FOUND,
         message: `Post is not found`
      }
   }

  if(role === "admin") {
   total_views = await ViewModel.count({where: {postId}})
     return {
        ok: true,
        status: StatusCodes.OK,
        message: 'Admins do not generate views.',
        body : {total_views}
     }
     
  }
   let viewTime: any = new Date()
   const lastView = await ViewModel.findOne({
      where: {
        postId,
        userId: id,
        createdAt: {
          [Op.gte]: new Date(viewTime - 5 * 60 * 1000), // 5 minutes ago
        },
      },
    });
    if (!lastView) {
      views = await ViewModel.create({
         postId,
         userId: id,
         userAgent: userAgent,
         ipAddress: ipAddress,
      })
    }

     return views
}