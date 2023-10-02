"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElevateValidation = void 0;
const Joi = require("joi");
const http_status_codes_1 = require("http-status-codes");
const ElevateValidation = (payload) => {
    const body = Joi.object({
        id: Joi.number().required()
    });
    const { error, value } = body.validate(payload, { abortEarly: false });
    if (error) {
        throw {
            ok: false,
            status: http_status_codes_1.StatusCodes.BAD_REQUEST,
            message: error.message
        };
    }
    return value;
};
exports.ElevateValidation = ElevateValidation;
