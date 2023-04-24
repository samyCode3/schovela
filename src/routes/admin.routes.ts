import * as express from 'express'
import { IsAdmin } from "../middleware/auth";
import { ElevateUsers } from '../controller/admin.controller';
const api = `/api/admin`;
export const AdminRoute = (router: any) => {
    router.post(`${api}/elevate`, IsAdmin, ElevateUsers)
}
