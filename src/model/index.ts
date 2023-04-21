import {UserModel} from './user.model'
import { seedData } from './admin.seed'
export const Model = () => {
    UserModel
    seedData()
}
Model()