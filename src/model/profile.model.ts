import { Model, DataTypes, DATE, Sequelize } from "sequelize";
import { sequelize } from "../config/database";
import { ROLE } from "../interface/enum/enum";import path = require("path");
import { UserModel } from "./user.model";
;
class Profile extends Model {
  id : number;
  bio : string;
  path: string;
  UserId : number
}

Profile.init(
  {
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile_img : {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    path : {
      type: DataTypes.STRING,
        allowNull: false,
    },

  },
  
  { sequelize }
);
Profile.belongsTo(UserModel);
export const ProfileModel = Profile;
