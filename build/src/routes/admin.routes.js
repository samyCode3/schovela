"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
const auth_1 = require("../middleware/auth");
const admin_controller_1 = require("../controller/admin.controller");
const api = `/api/admin`;
const AdminRoute = (router) => {
    router.post(`${api}/elevate`, auth_1.IsAdmin, admin_controller_1.ElevateUsers);
};
exports.AdminRoute = AdminRoute;
