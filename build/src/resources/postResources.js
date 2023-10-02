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
const Post = require("./resource");
exports.default = {
    create: (payload, post) => __awaiter(void 0, void 0, void 0, function* () {
        let { files, description, category, binaryData, content } = payload;
        const create_post = yield Post.default.create(Object.assign({}, payload), post);
        return create_post;
    }),
    getById: (userId, post) => __awaiter(void 0, void 0, void 0, function* () {
        const postById = yield Post.default.getByUserId(userId, post);
        return postById;
    })
};
