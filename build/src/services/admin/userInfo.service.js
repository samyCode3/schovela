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
exports.getUserById = exports.getByFilter = exports.get_all_user = exports.total_number_of_user = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const user_model_1 = require("../../model/user.model");
const messages_1 = require("../../utils/messages");
const total_number_of_user = () => __awaiter(void 0, void 0, void 0, function* () {
    const total_user = yield user_model_1.UserModel.count();
    return {
        ok: true,
        status: http_status_codes_1.StatusCodes.OK,
        message: messages_1.default.USER_RECORD,
        body: { total_user }
    };
});
exports.total_number_of_user = total_number_of_user;
const get_all_user = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findAll({ where: {
            status: { [sequelize_1.Op.not]: false },
            role: { [sequelize_1.Op.ne]: 'admin' }
        } });
    if (user.length === 0) {
        throw {
            ok: true,
            status: http_status_codes_1.StatusCodes.NOT_FOUND,
            message: messages_1.default.NO_USERS_FOUND
        };
    }
    return {
        ok: true,
        status: http_status_codes_1.StatusCodes.OK,
        message: messages_1.default.USER_RECORD,
        body: { user }
    };
});
exports.get_all_user = get_all_user;
const getByFilter = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = payload;
    const user = yield user_model_1.UserModel.findAll({ where: { role,
            status: {
                [sequelize_1.Op.not]: false
            }
        } });
    if (user.length == 0) {
        const users = yield user_model_1.UserModel.findAll({
            where: { role: { [sequelize_1.Op.ne]: 'admin' },
                status: { [sequelize_1.Op.not]: false } }
        });
        return {
            ok: true,
            status: http_status_codes_1.StatusCodes.OK,
            message: messages_1.default.USER_RECORD,
            body: { users }
        };
    }
    return {
        ok: true,
        status: http_status_codes_1.StatusCodes.OK,
        message: messages_1.default.USER_RECORD,
        body: { user }
    };
});
exports.getByFilter = getByFilter;
const getUserById = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = payload;
    const user = yield user_model_1.UserModel.findOne({ where: { id } });
    return {
        ok: true,
        status: http_status_codes_1.StatusCodes.OK,
        message: messages_1.default.USER_RECORD,
        body: { user }
    };
});
exports.getUserById = getUserById;
