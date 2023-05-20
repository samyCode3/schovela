"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpGen = void 0;
const OtpGen = (length) => {
    const otp = Math.floor(Math.random() * length * 100000);
    if (`${otp}`.length != 6) {
        return (0, exports.OtpGen)(length);
    }
    return otp;
};
exports.OtpGen = OtpGen;
