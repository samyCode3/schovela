import { Model, DataTypes, DATE, Sequelize } from "sequelize";
import { sequelize } from "../config/database";
import { ROLE } from "../interface/enum/enum";import path = require("path");
import { UserModel } from "./user.model";
import { PostModel } from "./post.model";
;
class View extends Model {
  id : number;
  userAgent : string;
  postId: number;
  userId : number;
  ipAddress: string
}

View.init(
  {
    userAgent : {
      type: DataTypes.STRING,
        allowNull: false,
    },
    ipAddress : {
      type: DataTypes.STRING,
        allowNull: false,
    },
    userId : {
      type: DataTypes.INTEGER,
        allowNull: false,
    },
    postId : {
      type: DataTypes.INTEGER,
        allowNull: false,
    },

  },
  
  { sequelize }
);

View.belongsTo(PostModel, {foreignKey: 'postId'});
export const ViewModel = View;
