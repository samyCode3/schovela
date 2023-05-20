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
exports.ElevateUser = void 0;
const user_model_1 = require("../model/user.model");
const enum_1 = require("../interface/enum/enum");
const http_status_codes_1 = require("http-status-codes");
const messages_1 = require("../utils/messages");
const ElevateUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const id = payload.id;
    let user = yield user_model_1.UserModel.findOne({ where: { id: id } });
    if (!user) {
        throw {
            ok: false,
            status: http_status_codes_1.StatusCodes.NOT_FOUND,
            message: messages_1.default.USER_NOT_FOUND
        };
    }
    if (user.role == enum_1.ROLE.admin) {
        throw {
            ok: false,
            status: http_status_codes_1.StatusCodes.BAD_REQUEST,
            message: messages_1.default.ALREADY_ADMIN
        };
    }
    yield user_model_1.UserModel.update({ role: enum_1.ROLE.admin }, { where: { id: id } });
    return {
        ok: true,
        status: http_status_codes_1.StatusCodes.OK,
        message: messages_1.default.ELEVELATED_TO_ADMIN,
        body: {}
    };
});
exports.ElevateUser = ElevateUser;
