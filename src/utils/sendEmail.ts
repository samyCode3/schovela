import { mail } from "../config/emailConfig";
import {
 StatusCodes
} from 'http-status-codes'
import { ApiResponseType } from "../interface/api.interface";
export const sendEmail = async (to, subject, text, html):  Promise<ApiResponseType> => {
  try {
  const send = await mail.sendMail({
    from: `${process.env.SMTP_NAME}\n ${process.env.SMTP_EMAIL}`,
    to,
    subject,
    text,
    html,
  });
   return { ok : true, status: StatusCodes.OK, message: send.messageId}
  } catch (error) {
    throw {
       ok : false,
       status : StatusCodes.REQUEST_TIMEOUT,
       message: error.message
    }
  }
};
 