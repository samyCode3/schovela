import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { ROLE, attachment_exts, levels } from "../interface/enum/enum";
import { UserModel } from "./user.model";

class Post extends Model {
  public title!: string;
  public desc: string;
  public live!: boolean;
  public id!: number;
  public attachment!: string;
  public attachment_ext!: attachment_exts;
  public UserId!: number;
  public level!: levels;
  public faculty!: string;
  public dept!: string;
  public last_updated_by!: ROLE
}

Post.init(
  {
    id : {
      type : DataTypes.INTEGER,
      allowNull : false,
      autoIncrement : true,
      primaryKey : true
    },
    title : {
      type : DataTypes.STRING(100),
      allowNull : false
    },
    desc : {
      type : DataTypes.TEXT('long'),
      allowNull : false
    },
    live : {
      type : DataTypes.BOOLEAN,
      defaultValue : false
    },
    attachment : {
      type : DataTypes.TEXT('long'),
      allowNull : false
    },
    attachment_ext : {
      type : DataTypes.STRING,
      allowNull : false
    },
    level : {
      type : DataTypes.STRING,
      allowNull : true
    },
    faculty : {
      type : DataTypes.STRING(100),
      allowNull : true
    },
    dept : {
      type : DataTypes.STRING(100),
      allowNull : true
    },
    last_updated_by : {
      type : DataTypes.ENUM(...Object.values(ROLE)),
      defaultValue : ROLE.admin
    }
  },
  
  { sequelize }
);

Post.belongsTo(UserModel);
export const PostModel = Post;
