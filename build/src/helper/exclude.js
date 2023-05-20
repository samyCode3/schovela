"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcludeField = void 0;
const ExcludeField = (user, keys) => {
    for (let key of keys) {
        delete user[key];
    }
    return user;
};
exports.ExcludeField = ExcludeField;
