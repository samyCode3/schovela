import { mail } from "../config/emailConfig";
import {
 StatusCodes
} from 'http-status-codes'
import { ApiResponseType } from "../interface/api.interface";
export const sendEmail = async (to, subject, text, html):  Promise<void> => {
  try {
  const send = await mail.sendMail({
    from: `${process.env.SMTP_NAME}\n ${process.env.SMTP_EMAIL}`,
    to,
    subject,
    text,
    html,
  });
   console.log({ ok : true, status: StatusCodes.OK, message: send.messageId})
  } catch (error) {
    console.log(error);
    throw error;
  }
};
 