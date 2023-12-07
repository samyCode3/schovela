import { Op } from "sequelize"
import { ApiResponseType } from "../interface/api.interface"
import { PostModel } from "../model/post.model"
import { UserModel } from "../model/user.model"
import { ViewModel } from "../model/view.model"
import { StatusCodes } from "http-status-codes"
import { ROLE } from "../interface/user.interface"
import { DownloadModel } from "../model/download.model"

export const Analytics = async (): Promise<ApiResponseType> => {
    let total_user = await UserModel.count({ where: {[Op.not] : [{role: ROLE.admin}]}})
    let total_content = await PostModel.count()
    let total_views = await ViewModel.count()
    let downloads = await DownloadModel.count()
    return {
        ok: true,
        status: StatusCodes.OK,
        message: `App Analytics`,
        body : {total_user, total_content, total_views, downloads}
    }
}