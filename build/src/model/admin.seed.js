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
exports.seedData = void 0;
const user_model_1 = require("./user.model");
const encryption_1 = require("../helper/encryption");
const user_interface_1 = require("../interface/user.interface");
const seedData = () => __awaiter(void 0, void 0, void 0, function* () {
    const seedIn = { fullname: 'femi fatokun', email: "femifatokun@gmail.com", password: 'password@#3', role: user_interface_1.ROLE.admin, status: true, };
    const user = yield user_model_1.UserModel.findOne({ where: { email: seedIn.email } });
    if (user) {
        console.log("Admin already existed");
    }
    else {
        seedIn.password = yield (0, encryption_1.encrypt)(seedIn.password);
        yield user_model_1.UserModel.create(Object.assign({}, seedIn));
        console.log("ADMIN is Created");
    }
});
exports.seedData = seedData;
