"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
// import * as config from 'config';
const default_1 = require("./default");
const pg = require("pg");
const sequelize_1 = require("sequelize");
// console.log(config);
// const host = config.get<string>('DATABASE.HOST')
// const user = config.get<string>('DATABASE.USER')
// const pass = config.get<string>('DATABASE.PASS')
// const database = config.get<string>('DATABASE.DB')
// const port = config.get<string>('DATABASE.PORT')
// export const sequelize = new Sequelize({
//     dialect : 'postgres',
//     host : host,
//     username : user,
//     password : pass,
//     database : database,
//     port : port
// })
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'postgres',
    dialectModule: pg,
    host: default_1.default.DATABASE.HOST,
    username: default_1.default.DATABASE.USER,
    password: default_1.default.DATABASE.PASS,
    database: default_1.default.DATABASE.DB,
    port: Number(default_1.default.DATABASE.PORT)
});
