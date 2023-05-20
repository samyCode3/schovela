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
exports.emailTemplate = void 0;
const sendEmail_1 = require("../utils/sendEmail");
const emailTemplate = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sendEmail_1.sendEmail)(email, 'Verify', 'Veudsi', `<h1>Your verification Code is ${otp}</h1>`);
    }
    catch (error) {
        throw error;
    }
});
exports.emailTemplate = emailTemplate;
