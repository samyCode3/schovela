"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Associate = void 0;
const data_base = require("./init.model");
const Associate = () => {
    data_base.UserModel.hasMany(data_base.PostModel, {
        foreignKey: 'userId',
        as: 'Posts'
    });
    data_base.PostModel.belongsTo(data_base.UserModel, {
        foreignKey: 'userId',
        as: 'Posts'
    });
};
exports.Associate = Associate;
(0, exports.Associate)();
