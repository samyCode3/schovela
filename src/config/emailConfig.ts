import config from './default';
// import * as config from 'config';
import { createTransport } from 'nodemailer';

export const mail = createTransport({
    host: config.mailgun.HOST,
    port: Number(config.mailgun.PORT),
    secure: true,
    auth: {
        user: config.mailgun.USER,
        pass: config.mailgun.PASS
    }, 
}) 
   