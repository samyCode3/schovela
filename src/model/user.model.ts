import { Model, DataTypes, DATE, Sequelize } from "sequelize";
import { sequelize } from "../config/database";
import { ROLE } from "../interface/enum/enum";;
class User extends Model {
  declare fullname : string;
  declare email : string;
  declare password : string;
  declare department: string;
  declare level : string;
  declare account_type : string;
  declare dob : string;
  declare faculty: string;
  declare phone: string;
  declare confirmationCode: string;
  declare status : boolean;
  declare resetToken : string
  declare role: ROLE
}

User.init(
  {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    account_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    faculty: {
      type: DataTypes.STRING,
      allowNull: false, 
      defaultValue: "",
    },
    confirmationCode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    resetToken : {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ROLE.user, 
    }
  },
  { sequelize }
);
export const UserModel = User;
