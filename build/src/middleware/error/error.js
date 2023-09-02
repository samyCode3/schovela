"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const ErrorMiddleware = (err, req, res, next) => {
    if (err.ok === false) {
        return res.status(err.status).json({ ok: err.ok, status: err.status, message: err.message });
    }
    if (err.status || 500) {
        return res.status(500).json({ ok: false, status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, message: "Server error" });
    }
};
exports.ErrorMiddleware = ErrorMiddleware;
