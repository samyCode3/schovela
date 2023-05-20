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
exports.decrypt = exports.encrypt = void 0;
const bcrypt = require("bcryptjs");
const encrypt = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = bcrypt.genSaltSync(10);
    const encrypt = yield bcrypt.hashSync(payload, salt);
    return encrypt;
});
exports.encrypt = encrypt;
const decrypt = (userData, hashedData) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield bcrypt.compare(userData, hashedData);
    return data;
});
exports.decrypt = decrypt;
