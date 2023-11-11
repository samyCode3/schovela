import { mail } from "../config/emailConfig";
// export const sendEmail = async (dtto, subject, text, html):  Promise<void> => {
//   try {
//   const send = await mail.sendMail({
//     from: `"${process.env.SMTP_NAME}" <${process.env.SMTP_EMAIL}>`,
//     to,
//     subject,
//     text,
//     html,
//   });
//   //  console.log({ ok : true, status: StatusCodes.OK, message: send.messageId})
//   return send
//   } catch (error) {
//     throw error;
//   }
// };

export const sendMail = async (details: { to: Array<string>, subject: string, text: string, html: string }) => {
    let { to, subject, text, html } = details;
    let readyTo = to.join(', '); 
    const send = await mail.sendMail({
        from: `"${process.env.SMTP_SENDER}" <${process.env.SMTP_USER}>`,
        to : readyTo,
        subject,
        text,
        html
    });
  

    try {
        return send.messageId;
    } catch (error) {
        throw error;
    } 
}
