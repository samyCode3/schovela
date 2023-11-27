import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

import { PostModel } from "./post.model";

export interface IDownload  {
    id?: number,
    userId: number,
    PostId: number,
    postId?: number,
    userAgent: string,
    ipAddress: string
}
class Download extends Model implements IDownload {
  public id!: number;
  public userId!: number;
  public PostId!: number;
  public userAgent!: string;
  public ipAddress!: string

}

Download.init(
  {
    id : {
      type : DataTypes.INTEGER,
      allowNull : false,
      autoIncrement : true,
      primaryKey : true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    userAgent : {
      type: DataTypes.STRING,
        allowNull: false,
    },
    ipAddress : {
      type: DataTypes.STRING,
        allowNull: false,
    },
  },
  
  { sequelize }
);

Download.belongsTo(PostModel);
export const DownloadModel = Download;
