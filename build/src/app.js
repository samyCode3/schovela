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
const express = require("express");
// import * as config from 'config'
const default_1 = require("./config/default");
const cors = require("cors");
const database_1 = require("./config/database");
const admin_seed_1 = require("./model/admin.seed");
const http_status_codes_1 = require("http-status-codes");
require("./model/index");
const routes_1 = require("./routes");
const port = default_1.default.PORT;
const app = express();
const connections = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.use(express.json());
        app.use(cors());
        app.use('/api', routes_1.IndexRoutes);
        app.all("*", (req, res, next) => {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ ok: false, message: 'Route not found', body: `${req.method} - ${req.ip} - ${req.url}` });
        });
        database_1.sequelize.sync({ alter: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            console.log('Database connected successfully.');
            yield (0, admin_seed_1.seedData)();
            app.listen(port, () => console.log(`App running on port http://localhost:${port}`));
        })).catch((err) => {
            throw err;
        });
    }
    catch (err) {
        console.error(`Error : ${err}, Can't connect to database...`);
    }
});
connections();
