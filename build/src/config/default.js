"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./envConfig");
exports.default = {
    PORT: process.env.PORT || '4000',
    DATABASE: {
        HOST: process.env.HOST || '',
        USER: process.env.USER || '',
        PASS: process.env.PASS || '',
        DB: process.env.DATABASE || '',
        PORT: process.env.MYSQL_PORT || '',
    },
    mailgun: {
        HOST: process.env.SMTP_HOST,
        PORT: process.env.SMTP_PORT,
        SECURE: process.env.SMTP_SECURE,
        USER: process.env.SMTP_USER,
        PASS: process.env.SMTP_PASSWORD
    },
    token: {
        BEARER_TOKEN: process.env.BEARER_TOKEN,
    }
};
