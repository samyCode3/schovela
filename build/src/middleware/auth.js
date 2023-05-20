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
exports.IsAdmin = exports.RefreshToken = exports.VerifiedUser = exports.NotVerifiedUser = void 0;
const user_model_1 = require("../model/user.model");
const token_1 = require("../helper/token");
const user_interface_1 = require("../interface/user.interface");
const http_status_codes_1 = require("http-status-codes");
const messages_1 = require("../utils/messages");
const NotVerifiedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ ok: false, status: http_status_codes_1.StatusCodes.UNAUTHORIZED, message: messages_1.default.UNAUTHORIZED
            });
        }
        const token = authHeader.split(" ")[1];
        const userToken = yield (0, token_1.verifyTokens)(token, process.env.BEARER_TOKEN);
        const findUser = yield user_model_1.UserModel.findOne({ where: { email: userToken.data.email } });
        if (!findUser) {
            return {
                ok: false,
                status: http_status_codes_1.StatusCodes.FORBIDDEN,
                message: messages_1.default.FORBIDDEN
            };
        }
        req.user = userToken;
        next();
    }
    catch (err) {
        const error = new Error(err.message);
        console.error(error);
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ ok: false, status: http_status_codes_1.StatusCodes.UNAUTHORIZED, message: err.message });
    }
});
exports.NotVerifiedUser = NotVerifiedUser;
const VerifiedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.user.data.email;
        const user = yield user_model_1.UserModel.findOne({ where: { email: email } });
        if (user.status !== true) {
            return {
                ok: false, status: http_status_codes_1.StatusCodes.UNAUTHORIZED, message: messages_1.default.UNAUTHORIZED
            };
        }
        next();
    }
    catch (err) {
        const error = new Error(err.message);
        return res.status(403).json({ ok: false, status: http_status_codes_1.StatusCodes.FORBIDDEN, message: err.message });
    }
});
exports.VerifiedUser = VerifiedUser;
const RefreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        console.log(user);
    }
    catch (err) {
        const error = new Error(err.message);
        return res.status(403).json({ ok: false, status: http_status_codes_1.StatusCodes.FORBIDDEN, message: err.message });
    }
});
exports.RefreshToken = RefreshToken;
const IsAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = 'femifatokun@gmail.com';
        const user = yield user_model_1.UserModel.findOne({ where: { email: email } });
        if (!user) {
            throw {
                ok: false,
                status: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                message: "You are not authorized to perform this request",
                body: { user }
            };
        }
        if (user.role !== user_interface_1.ROLE.admin) {
            throw {
                ok: false,
                status: http_status_codes_1.StatusCodes.FORBIDDEN,
                message: "User is not allow to perform this action",
                body: { user }
            };
        }
        req.user = user;
        next();
    }
    catch (err) {
        const error = new Error(err.message);
        return res.status(403).json({ ok: false, status: http_status_codes_1.StatusCodes.FORBIDDEN, message: err.message });
    }
});
exports.IsAdmin = IsAdmin;
