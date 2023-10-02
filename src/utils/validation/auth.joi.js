"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordSchema = exports.ForgottenPasswordSchema = exports.loginSchema = exports.UserInfoSchema = exports.verifySchema = exports.registerSchema = void 0;
const Joi = require("joi");
const http_status_codes_1 = require("http-status-codes");
const registerSchema = (payload) => {
    const body = Joi.object({
        fullname: Joi.string().required().min(4).max(10000),
        email: Joi.string().email().required()
    });
    const { error, value } = body.validate(payload, { abortEarly: false });
    if (error) {
        throw { ok: false, status: http_status_codes_1.StatusCodes.BAD_REQUEST, message: error.message };
    }
    return value;
};
exports.registerSchema = registerSchema;
const verifySchema = (payload) => {
    const body = Joi.object({
        code: Joi.string().required(),
        password: Joi.string().required().min(8).max(10000),
        confirmPassword: Joi.ref('password')
    });
    const { error, value } = body.validate(payload, { abortEarly: false });
    if (error) {
        throw { ok: false, status: http_status_codes_1.StatusCodes.BAD_REQUEST, message: error.message };
    }
    return value;
};
exports.verifySchema = verifySchema;
const UserInfoSchema = (schema) => {
    const body = Joi.object({
        department: Joi.string().optional(),
        level: Joi.number().optional(),
        phone: Joi.string().optional(),
        account_type: Joi.string().optional(),
        faculty: Joi.string().optional(),
        dob: Joi.string().optional()
    });
    const { error, value } = body.validate(schema, { abortEarly: false });
    if (error) {
        throw { ok: false, status: http_status_codes_1.StatusCodes.BAD_REQUEST, message: error.message };
    }
    return value;
};
exports.UserInfoSchema = UserInfoSchema;
const loginSchema = (payload) => {
    const body = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8).max(10000)
    });
    const { error, value } = body.validate(payload, { abortEarly: false });
    if (error) {
        throw { ok: false, status: http_status_codes_1.StatusCodes.BAD_REQUEST, message: error.message };
    }
    return value;
};
exports.loginSchema = loginSchema;
const ForgottenPasswordSchema = (payload) => {
    const body = Joi.object({
        email: Joi.string().required()
    });
    const { error, value } = body.validate(payload, { abortEarly: false });
    if (error) {
        throw { ok: false, status: http_status_codes_1.StatusCodes.BAD_REQUEST, message: error.message };
    }
    return value;
};
exports.ForgottenPasswordSchema = ForgottenPasswordSchema;
const ResetPasswordSchema = (payload) => {
    const body = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
        code: Joi.string().required(),
        NewPassword: Joi.string().required().min(8).max(10000000000),
        confirmPassword: Joi.ref("NewPassword")
    });
    const { error, value } = body.validate(payload, { abortEarly: false });
    if (error) {
        throw { ok: false, status: http_status_codes_1.StatusCodes.BAD_REQUEST, message: error.message };
    }
    return value;
};
exports.ResetPasswordSchema = ResetPasswordSchema;
