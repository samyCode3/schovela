import { Model, DataTypes, DATE, Sequelize } from "sequelize";
import { sequelize } from "../config/database";
import { ROLE } from "../interface/enum/enum";
;
class Post extends Model {
  public title!: string;
  public description?: string;
  public userId!: number;
  public category!: string;
  public content!: string;
  public files : object;
  public status!: "Approved" | "Pending" | "Hidden" | "Live";
  public id!: number;
  public binaryData!: Buffer | null;
  public setBase64Data(base64String: string) {
    this.binaryData = Buffer.from(base64String, 'base64');
  }
  public getBase64Data(): string | null {
    return this.binaryData ? this.binaryData.toString('base64') : null;
  }
}

Post.init(
  {
    description : {
      type: DataTypes.STRING,
        allowNull: false,
    },
    title : {
      type: DataTypes.STRING,
        allowNull: false,
    },
    category : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content : {
        type: DataTypes.STRING,
        allowNull: true,
    },
  binaryData : {
    type : DataTypes.BLOB,
    allowNull: true,
  },
  files : {
    type: DataTypes.JSON,
    allowNull: true,
  },
    

  },
  
  { sequelize }
);
export const PostModel = Post;