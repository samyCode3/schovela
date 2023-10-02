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
exports.verifyTokens = exports.refreshToken = exports.bearerToken = void 0;
const jwt = require("jsonwebtoken");
const default_1 = require("../config/default");
const bearer = default_1.default.token.BEARER_TOKEN;
const refresh = default_1.default.token.REFRESH_TOKEN;
const bearerToken = (data) => {
    return jwt.sign({ data }, bearer);
};
exports.bearerToken = bearerToken;
const refreshToken = (data) => {
    return jwt.sign({ data }, refresh);
};
exports.refreshToken = refreshToken;
const verifyTokens = (payload, Tokens) => __awaiter(void 0, void 0, void 0, function* () {
    return yield jwt.verify(payload, Tokens);
});
exports.verifyTokens = verifyTokens;
