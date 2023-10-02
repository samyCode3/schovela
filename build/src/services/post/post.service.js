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
exports.getPostService = exports.createPostService = void 0;
const http_status_codes_1 = require("http-status-codes");
const post_model_1 = require("../../model/post.model");
const Post = require("../../resources/postResources");
const createPostService = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = user.data;
    const create_post = yield Post.default.create(Object.assign(Object.assign({}, payload), { userId: id }), post_model_1.PostModel)
        .then((post) => {
        return { ok: true, status: http_status_codes_1.StatusCodes.OK, message: "Success", body: { post } };
    })
        .catch((error) => {
        throw { ok: false, status: http_status_codes_1.StatusCodes.BAD_REQUEST, message: { error: error.message }
        };
    });
    return create_post;
});
exports.createPostService = createPostService;
const getPostService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = user.data;
    console.log(id);
    let userId = id;
    const getPostId = yield Post.default.getById(userId, post_model_1.PostModel)
        .then((post) => {
        return { ok: true, status: http_status_codes_1.StatusCodes.OK, message: "Success", body: { post } };
    })
        .catch((error) => {
        throw {
            ok: false, status: http_status_codes_1.StatusCodes.BAD_REQUEST, message: { error: error.message }
        };
    });
    return getPostId;
});
exports.getPostService = getPostService;
