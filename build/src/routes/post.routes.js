"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = require("express");
const PostController = require("../controller/post.controller");
const auth_1 = require("../middleware/auth");
exports.postRoutes = (0, express_1.Router)();
exports.postRoutes.post('/', auth_1.AuthUser, PostController.default.createPostController);
exports.postRoutes.get('/', auth_1.AuthUser, PostController.default.getPostControllerById);
