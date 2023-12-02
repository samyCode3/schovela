import config from './default';
// import * as config from 'config';
import { createTransport } from 'nodemailer';

export const mail = createTransport({
    host: config.mailgun.HOST,
    port: Number(config.mailgun.PORT),
    secure: false,
    auth: {
        user: config.mailgun.USER,
        pass: config.mailgun.PASS
    }, 
    tls: {
        ciphers:'SSLv3',
        rejectUnauthorized: false
    }
}) 
   