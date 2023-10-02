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
exports.getUserByIdController = exports.getUserByFilterController = exports.getUserController = exports.getTotalUserController = void 0;
const userInfo_service_1 = require("../../services/admin/userInfo.service");
const getTotalUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userInfo_service_1.total_number_of_user)();
        return res.json(Object.assign({}, user));
    }
    catch (error) {
        return res.status(error.status).json({ ok: false, status: error.status, message: error.message });
    }
});
exports.getTotalUserController = getTotalUserController;
const getUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userInfo_service_1.get_all_user)();
        return res.json(Object.assign({}, user));
    }
    catch (error) {
        next(error);
    }
});
exports.getUserController = getUserController;
const getUserByFilterController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req;
        const user = yield (0, userInfo_service_1.getByFilter)(query);
        return res.json(Object.assign({}, user));
    }
    catch (error) {
        return res.status(500).json({ ok: false, status: error.status, message: error.message });
    }
});
exports.getUserByFilterController = getUserByFilterController;
const getUserByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { params } = req;
    let payload;
    try {
        const user = yield (0, userInfo_service_1.getUserById)(params);
        return res.json(Object.assign({}, user));
    }
    catch (error) {
        return res.status(error.status).json({ ok: false, status: error.status, message: error.message });
    }
});
exports.getUserByIdController = getUserByIdController;
