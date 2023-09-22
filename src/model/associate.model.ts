import { UserModel } from "./user.model"
import { ProfileModel } from "./profile.model"
export const DbAssociate = () => {
    UserModel.hasOne(ProfileModel, {
        foreignKey: 'userId'
    })
    ProfileModel.belongsTo(UserModel, {
        foreignKey: 'userId'
})
}