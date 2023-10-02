"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const Joi = require("joi");
const http_status_codes_1 = require("http-status-codes");
const registerSchema = (payload) => {
    const body = Joi.object({
        title: Joi.string().required(),
        files: Joi.array().required(),
        category: Joi.string().required(),
        description: Joi.string().required()
    });
    const { error, value } = body.validate(payload, { abortEarly: false });
    if (error) {
        throw { ok: false, status: http_status_codes_1.StatusCodes.BAD_REQUEST, message: error.message };
    }
    return value;
};
exports.registerSchema = registerSchema;
