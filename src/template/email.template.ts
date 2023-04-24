import { sendEmail } from "../utils/sendEmail";
export const emailTemplate = async (email: string, otp: any) => {
    try{
        await sendEmail(email, 'Verify', 'Veudsi', `<h1>Your verification Code is ${otp}</h1>`)
    }catch(error){
        throw error;
    }
}