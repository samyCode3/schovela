"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const emailConfig_1 = require("../config/emailConfig");
const sendEmail = (to, subject, text, html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const send = yield emailConfig_1.mail.sendMail({
            from: `${process.env.SMTP_NAME}\n ${process.env.SMTP_EMAIL}`,
            to,
            subject,
            text,
            html,
        });
        //  console.log({ ok : true, status: StatusCodes.OK, message: send.messageId})
    }
    catch (error) {
        throw error;
    }
});
exports.sendEmail = sendEmail;
