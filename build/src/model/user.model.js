"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const enum_1 = require("../interface/enum/enum");
;
class User extends sequelize_1.Model {
}
User.init({
    fullname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    department: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    level: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    account_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    dob: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    faculty: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    confirmationCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    resetToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: enum_1.ROLE.user,
    }
}, { sequelize: database_1.sequelize });
exports.UserModel = User;
