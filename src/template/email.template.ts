import { sendMail } from "../utils/sendEmail";
export const emailTemplate = async (email: string, otp: any) => {
    try{
        await sendMail({to: [email], subject: 'Verify', text: 'Veudsi',  html: `<h1>Your verification Code is ${otp}</h1>`})
    }catch(error){
        throw error;
    }
}