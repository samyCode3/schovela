"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
;
class Post extends sequelize_1.Model {
    setBase64Data(base64String) {
        this.binaryData = Buffer.from(base64String, 'base64');
    }
    getBase64Data() {
        return this.binaryData ? this.binaryData.toString('base64') : null;
    }
}
Post.init({
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    binaryData: {
        type: sequelize_1.DataTypes.BLOB,
        allowNull: true,
    },
    files: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
}, { sequelize: database_1.sequelize });
exports.PostModel = Post;
