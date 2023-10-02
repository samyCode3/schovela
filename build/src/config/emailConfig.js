"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mail = void 0;
const default_1 = require("./default");
// import * as config from 'config';
const nodemailer_1 = require("nodemailer");
exports.mail = (0, nodemailer_1.createTransport)({
    host: default_1.default.mailgun.HOST,
    port: Number(default_1.default.mailgun.PORT),
    secure: true,
    auth: {
        user: default_1.default.mailgun.USER,
        pass: default_1.default.mailgun.PASS
    }
});
