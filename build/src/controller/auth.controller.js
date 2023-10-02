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
exports.ResetController = exports.ForgottenPasswordController = exports.UserInfosController = exports.LoginUserController = exports.ResendUserOtp = exports.VerifyUserAccountController = exports.registerController = void 0;
const auth_service_1 = require("../services/auth/auth.service");
const auth_joi_1 = require("../utils/validation/auth.joi");
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    let payload;
    try {
        payload = yield (0, auth_joi_1.registerSchema)(body);
        const registerUser = yield (0, auth_service_1.registerService)(payload);
        return res.status(registerUser.status).json(Object.assign({}, registerUser));
    }
    catch (error) {
        return res.status(error.status).json({ ok: false, status: error.status, message: error.message });
    }
});
exports.registerController = registerController;
const VerifyUserAccountController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, user } = req;
    let payload;
    try {
        payload = yield (0, auth_joi_1.verifySchema)(body);
        const userControl = yield (0, auth_service_1.verifyUser)(payload, user);
        return res.status(userControl.status).json(Object.assign({}, userControl));
    }
    catch (error) {
        return res.status(error.status).json({ ok: false, status: error.status, message: error.message });
    }
});
exports.VerifyUserAccountController = VerifyUserAccountController;
const ResendUserOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    try {
        const users = yield (0, auth_service_1.ResentOtp)(user);
        return res.status(users.status).json(Object.assign({}, users));
    }
    catch (error) {
        return res.status(error.status).json({ ok: false, status: error.status, message: error.message });
    }
});
exports.ResendUserOtp = ResendUserOtp;
const LoginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    let payload;
    try {
        payload = yield (0, auth_joi_1.loginSchema)(body);
        const user = yield (0, auth_service_1.LoginUser)(payload);
        return res.status(user.status).json(Object.assign({}, user));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(Object.assign({}, error));
    }
});
exports.LoginUserController = LoginUserController;
const UserInfosController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    let payload;
    try {
        payload = yield (0, auth_joi_1.UserInfoSchema)(body);
        const user = yield (0, auth_service_1.UserInfo)(payload, req.user);
        return res.status(user.status).json(Object.assign({}, user));
    }
    catch (error) {
        console.log(error);
        return res.status(error.status).json({ ok: false, status: error.status, message: error.message });
    }
});
exports.UserInfosController = UserInfosController;
const ForgottenPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    let payload;
    try {
        payload = yield (0, auth_joi_1.ForgottenPasswordSchema)(body);
        const user = yield (0, auth_service_1.forgottenPassword)(payload);
        return res.status(user.status).json(Object.assign({}, user));
    }
    catch (error) {
        console.log(error);
        return res.status(error.status).json({ ok: false, status: error.status, message: error.message });
    }
});
exports.ForgottenPasswordController = ForgottenPasswordController;
const ResetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    let payload;
    try {
        payload = yield (0, auth_joi_1.ResetPasswordSchema)(body);
        const user = yield (0, auth_service_1.ResetPassword)(payload);
        return res.status(user.status).json(Object.assign({}, user));
    }
    catch (error) {
        console.log(error);
        return res.status(error.status).json({ ok: false, status: error.status, message: error.message });
    }
});
exports.ResetController = ResetController;
