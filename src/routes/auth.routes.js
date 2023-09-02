"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const auth_1 = require("../middleware/auth");
exports.authRoutes = (0, express_1.Router)();
exports.authRoutes.get('/', (req, res, next) => {
    return res.send("Happy coding");
});
exports.authRoutes.post(`/create`, auth_controller_1.registerController);
exports.authRoutes.post(`/login`, auth_controller_1.LoginUserController);
exports.authRoutes.post(`/verify`, auth_1.AuthUser, auth_controller_1.VerifyUserAccountController);
exports.authRoutes.post(`/refresh`, auth_1.AuthUser, auth_1.RefreshToken);
exports.authRoutes.patch(`/resend`, auth_1.AuthUser, auth_controller_1.ResendUserOtp);
exports.authRoutes.patch(`/forgot`, auth_controller_1.ForgottenPasswordController);
exports.authRoutes.post(`/change/password`, auth_controller_1.ResetController);
