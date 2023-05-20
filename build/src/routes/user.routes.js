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
exports.UserRouter = void 0;
const auth_controller_1 = require("../controller/auth.controller");
const auth_1 = require("../middleware/auth");
const api = `/api/user`;
const UserRouter = (router) => __awaiter(void 0, void 0, void 0, function* () {
    router.use(auth_1.NotVerifiedUser);
    router.post(`${api}/data`, auth_1.VerifiedUser, auth_controller_1.UserInfosController, (req, res, next) => { });
});
exports.UserRouter = UserRouter;
