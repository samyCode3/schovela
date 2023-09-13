import {Router} from 'express'
import { IsAdmin, AuthUser } from "../middleware/auth";
import { De_elevateModeratorController, ElevateToModeratorController, ElevateUsers } from '../controller/admin/admin.controller';
import { getTotalUserController, getUserByFilterController, getUserByIdController, getUserController } from '../controller/admin/userInfo.controller;';


export const adminRouter = Router()
adminRouter.use(AuthUser)
adminRouter.use(IsAdmin)
adminRouter.post(`/elevate`, ElevateUsers)
adminRouter.post(`/moderator`, ElevateToModeratorController)
adminRouter.post(`/de_elevate`, De_elevateModeratorController)
adminRouter.get(`/total/users`, getTotalUserController)            
adminRouter.get(`/users`, getUserController)
// adminRouter.get(`/filter/:role`, getUserByFilterController)
adminRouter.get(`/user/:id`, getUserByIdController)


