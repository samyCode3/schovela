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
exports.router = void 0;
const auth_controller_1 = require("../controller/auth.controller");
const auth_1 = require("../middleware/auth");
const api = `/api/auth`;
const router = (router) => __awaiter(void 0, void 0, void 0, function* () {
    router.get('/', (req, res, next) => {
        return res.send("Happy coding");
    });
    router.post(`${api}/create`, auth_controller_1.registerController);
    router.post(`${api}/login`, auth_controller_1.LoginUserController);
    router.post(`${api}/verify`, auth_1.NotVerifiedUser, auth_controller_1.VerifyUserAccountController);
    router.post(`${api}/refresh`, auth_1.NotVerifiedUser, auth_1.RefreshToken);
    router.patch(`${api}/resend`, auth_1.NotVerifiedUser, auth_controller_1.ResendUserOtp);
    router.patch(`${api}/forgot`, auth_controller_1.ForgottenPasswordController);
    router.post(`${api}/change/password`, auth_controller_1.ResetController);
});
exports.router = router;
