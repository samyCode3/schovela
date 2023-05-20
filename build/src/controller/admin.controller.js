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
exports.ElevateUsers = void 0;
const admin_service_1 = require("../services/admin.service");
const admin_joi_1 = require("../utils/validation/admin.joi");
const ElevateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    let payload;
    try {
        payload = yield (0, admin_joi_1.ElevateValidation)(body);
        const registerUser = yield (0, admin_service_1.ElevateUser)(payload);
        return res.json(Object.assign({}, registerUser));
    }
    catch (error) {
        return res.status(error.status).json({ ok: false, status: error.status, message: error.message });
    }
});
exports.ElevateUsers = ElevateUsers;
