import { UserModel } from "../model/user.model"
export const ExcludeField = <UserModel, Key extends keyof UserModel>(user: UserModel, keys: Key[]): Omit<UserModel, Key> => {
  for (let key of keys) {
    delete user[key];
  }
  return user;
};
