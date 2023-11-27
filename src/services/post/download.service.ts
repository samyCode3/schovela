import { StatusCodes } from "http-status-codes"
import { PostModel } from "../../model/post.model"
import { DownloadModel } from "../../model/download.model"
import { IUser } from "../../interface/user.interface"


export const downloadDocumentService = async (postId: any, ipAddress: string, userAgent: string, user: IUser) => {
    let { id } = user.data
    let post = await PostModel.findOne({ where: { id: postId } })
    let checkDownload = await DownloadModel.findOne({ where: { PostId: postId, userId: id} })
    if (!post) {
        throw {
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            message: `This document may have been deleted or doesn't exist`
        }
    }
       if(checkDownload) {
            throw {
                ok: false,
                status: StatusCodes.BAD_REQUEST,
                message: `This document has already been download`
            }
       }
    await PostModel.update({ downloaded: post?.downloaded + 1 }, { where: { id: postId } })
    if (checkDownload) {
        await DownloadModel.update({ PostId: postId, ipAddress, userAgent, userId: id }, { where: { userId: id } })
    } else {
        await DownloadModel.create({ PostId: postId, ipAddress, userAgent, userId: id })
    }

    return {
        ok: true,
        status: StatusCodes.OK,
        message: `This document was downloaded`,
        body : {}
    }

}