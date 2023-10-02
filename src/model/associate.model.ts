import * as data_base from './init.model'
export const Associate = () => {
    data_base.UserModel.hasMany(data_base.PostModel, {
        foreignKey : 'userId',
         as : 'Posts'
  })
  
  data_base.PostModel.belongsTo(data_base.UserModel, {
      foreignKey : 'userId',
         as : 'Posts'
  })
}
Associate()
