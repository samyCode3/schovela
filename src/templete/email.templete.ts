import { sendEmail } from "../utils/sendEmail";
export const emailTemplete = async (email: string, otp: any) => {
 return  sendEmail(email, 'Verify', 'Veudsi', `<h1>Your verification Code is ${otp}</h1>`)

}