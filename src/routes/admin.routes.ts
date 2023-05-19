import {Router} from 'express'
import { IsAdmin } from "../middleware/auth";
import { ElevateUsers } from '../controller/admin.controller';

export const adminRouter = Router()
adminRouter.post(`/elevate`, IsAdmin, ElevateUsers)

