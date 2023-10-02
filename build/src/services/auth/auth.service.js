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
exports.ResetPassword = exports.forgottenPassword = exports.LoginUser = exports.UserInfo = exports.ResentOtp = exports.verifyUser = exports.registerService = void 0;
const user_model_1 = require("../../model/user.model");
const messages_1 = require("../../utils/messages");
const email_template_1 = require("../../template/email.template");
const otp_1 = require("../../packages/otp");
const encryption_1 = require("../../helper/encryption");
const token_1 = require("../../helper/token");
const exclude_1 = require("../../helper/exclude");
const http_status_codes_1 = require("http-status-codes");
const registerService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield user_model_1.UserModel.findOne({ where: { email: payload.email } });
    if (findUser) {
        if (findUser.password != '' || findUser.status !== false) {
            throw {
                ok: false,
                status: http_status_codes_1.StatusCodes.BAD_REQUEST,
                message: messages_1.default.DUPLICATE_EMAIL
            };
        }
    }
    const otp = (0, otp_1.OtpGen)(6);
    // try{
    //   await emailTemplate(payload.email, otp) 
    // }catch(error){
    //   console.error(error);
    //   throw { ok : false, message : messages.FAILED_TO_SEND_EMAIL, status : StatusCodes.INTERNAL_SERVER_ERROR };
    // }
    const bearerTokens = yield (0, token_1.bearerToken)(payload);
    const confirmationCode = yield (0, encryption_1.encrypt)(otp.toString());
    let user;
    if (findUser) {
        user = findUser;
        user.confirmationCode = confirmationCode;
        user.fullname = payload.fullname;
        yield user.save();
    }
    else {
        user = yield user_model_1.UserModel.create(Object.assign({ confirmationCode }, payload));
        user = (0, exclude_1.ExcludeField)(user.dataValues, ['password', 'confirmationCode', 'resetToken']);
    }
    return {
        ok: true,
        message: messages_1.default.CREATED,
        status: http_status_codes_1.StatusCodes.CREATED,
        body: { user, bearerTokens, otp }
    };
});
exports.registerService = registerService;
//verifyUser
const verifyUser = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const email = user.data.email;
    const { code, password } = payload;
    const findUser = yield user_model_1.UserModel.findOne({ where: { email: email } });
    const verifyCode = yield (0, encryption_1.decrypt)(code, findUser.confirmationCode);
    if (!findUser || !verifyCode) {
        return { ok: false, status: http_status_codes_1.StatusCodes.BAD_REQUEST, message: messages_1.default.INCORRECT_OTP_CODE };
    }
    const UserPassword = yield (0, encryption_1.encrypt)(password);
    yield user_model_1.UserModel.update({ status: true, confirmationCode: '', password: UserPassword }, { where: { email: email } });
    return { ok: true, status: http_status_codes_1.StatusCodes.OK, message: messages_1.default.CONTINUE, body: {} };
});
exports.verifyUser = verifyUser;
//Resend Otp 
const ResentOtp = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const email = user.data.email;
    const findUser = yield user_model_1.UserModel.findOne({ where: { email: email } });
    if (!findUser || findUser.status != false) {
        throw { ok: false, status: http_status_codes_1.StatusCodes.BAD_REQUEST, message: messages_1.default.VERIFIED };
    }
    const otp = (0, otp_1.OtpGen)(6);
    try {
        yield (0, email_template_1.emailTemplate)(email, otp);
    }
    catch (error) {
        throw { ok: false, message: messages_1.default.FAILED_TO_SEND_EMAIL, status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR };
    }
    const confirmationCode = yield (0, encryption_1.encrypt)(otp.toString());
    yield user_model_1.UserModel.update({ confirmationCode: confirmationCode }, { where: { email: email } });
    return {
        ok: true,
        status: http_status_codes_1.StatusCodes.OK,
        message: messages_1.default.CHECK_FOR_OTP,
        body: {}
    };
});
exports.ResentOtp = ResentOtp;
//User Info 
const UserInfo = (payload, auth) => __awaiter(void 0, void 0, void 0, function* () {
    const email = auth.data.email;
    let user = yield user_model_1.UserModel.findOne({ where: { email: email } });
    if (!user || user.status != true) {
        throw { ok: false, status: http_status_codes_1.StatusCodes.UNAUTHORIZED, message: messages_1.default.UNAUTHORIZED_REQUEST };
    }
    let keys = Object.keys(payload);
    for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = payload[keys[i]];
    }
    user.save();
    user = user.dataValues;
    (0, exclude_1.ExcludeField)(user, ['password', 'resetToken', 'confirmationCode']);
    return {
        ok: true,
        status: http_status_codes_1.StatusCodes.OK,
        message: messages_1.default.INFO_ADDED,
        body: { user }
    };
});
exports.UserInfo = UserInfo;
//Login User
const LoginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield user_model_1.UserModel.findOne({ where: { email: email } });
    if (!user) {
        throw {
            ok: false,
            status: http_status_codes_1.StatusCodes.BAD_REQUEST,
            message: messages_1.default.INCORRECT_LOGIN_DETAILS,
        };
    }
    const comparePassword = yield (0, encryption_1.decrypt)(password, user.password);
    if (!comparePassword) {
        throw {
            ok: false,
            status: http_status_codes_1.StatusCodes.BAD_REQUEST,
            message: messages_1.default.INCORRECT_LOGIN_DETAILS,
        };
    }
    const bearerTokens = yield (0, token_1.bearerToken)({ fullname: user.fullname, email, id: user.id });
    let resUser = (0, exclude_1.ExcludeField)(user.dataValues, ['password', 'confirmationCode', 'resetToken']);
    return {
        ok: true,
        status: http_status_codes_1.StatusCodes.OK,
        message: messages_1.default.LOGGEDIN,
        body: { user: resUser, bearerTokens }
    };
});
exports.LoginUser = LoginUser;
//Forget Password
const forgottenPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload;
    const user = yield user_model_1.UserModel.findOne({ where: { email: email } });
    if (!user) {
        throw {
            ok: false,
            status: http_status_codes_1.StatusCodes.NOT_FOUND,
            message: messages_1.default.USER_NOT_FOUND
        };
    }
    const otp = (0, otp_1.OtpGen)(4);
    try {
        yield (0, email_template_1.emailTemplate)(otp, email);
    }
    catch (error) {
        throw { ok: false, message: messages_1.default.FAILED_TO_SEND_EMAIL, status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR };
    }
    const resetToken = yield (0, encryption_1.encrypt)(otp.toString());
    yield user_model_1.UserModel.update({ resetToken }, { where: { email: email } });
    return {
        ok: true,
        status: http_status_codes_1.StatusCodes.OK,
        message: messages_1.default.CHECK_FOR_OTP,
        body: {}
    };
});
exports.forgottenPassword = forgottenPassword;
const ResetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, code, NewPassword } = payload;
    const user = yield user_model_1.UserModel.findOne({ where: { email: email } });
    if (!user) {
        return {
            ok: false,
            status: http_status_codes_1.StatusCodes.FORBIDDEN,
            message: messages_1.default.INCORRECT_OTP_CODE
        };
    }
    const decryptCode = yield (0, encryption_1.decrypt)(code, user.resetToken);
    if (!decryptCode) {
        return {
            ok: false,
            status: http_status_codes_1.StatusCodes.FORBIDDEN,
            message: messages_1.default.INCORRECT_OTP_CODE
        };
    }
    NewPassword = yield (0, encryption_1.encrypt)(NewPassword);
    yield user_model_1.UserModel.update({ password: NewPassword, resetToken: '' }, { where: { email: email } });
    return {
        ok: true,
        status: http_status_codes_1.StatusCodes.OK,
        message: messages_1.default.PASSWORD_IS_CHANGED,
        body: {}
    };
});
exports.ResetPassword = ResetPassword;
