"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const auth_1 = require("../middleware/auth");
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.use(auth_1.AuthUser);
exports.userRoutes.post(`/data`, auth_1.VerifiedUser, auth_controller_1.UserInfosController);
