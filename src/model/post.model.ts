import { Model, DataTypes, DATE, Sequelize } from "sequelize";
import { sequelize } from "../config/database";
import { ROLE } from "../interface/enum/enum";
;
class Post extends Model {
  id : number;
  filename: string;
  path: string;
  title: string;
  description: string;
  userId : number;
  category: string;
  status: "Approved" | "Pending" | "Hidden" | "Live"
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
    media : {
        type: DataTypes.JSON,
      allowNull: false
    }
    

  },
  
  { sequelize }
);
export const PostModel = Post;
