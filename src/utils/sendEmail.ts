import { mail } from "../../config/emailConfig";
import {
 StatusCodes
} from 'http-status-codes'
export const sendEmail = async (to, subject, text, html) => {
  const send = await mail.sendMail({
    from: `${process.env.SMTP_NAME}\n ${process.env.SMTP_EMAIL}`,
    to,
    subject,
    text,
    html,
  });

  try {
    return send.messageId;
  } catch (error) {
    throw error;
  }
};
