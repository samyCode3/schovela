import * as express from 'express'
import { getByFilter, getUserById, get_all_user, total_number_of_user } from '../../services/admin/userInfo.service';
import { filterUsersValidation } from '../../utils/validation/admin.joi';

export const getTotalUserController = async (req, res, next) => {
    try {
        const user = await total_number_of_user()
        return res.json({ ...user })
    } catch (error) {
        return res.status(error.status).json({ ok: false, status: error.status, message: error.message });
    }
}
export const getUserController = async (req, res, next) => {
    const { query } = req;
    try {
        const payload = filterUsersValidation(query);
        const user = await get_all_user(payload);     
        return res.json({ ...user })
    } catch (error) {
        next(error)
    }
}

export const getUserByFilterController = async (req, res, next) => {
    try {
        const { query } = req
        const user = await getByFilter(query)
        return res.json({ ...user })
    } catch (error) {
        return res.status(500).json({ ok: false, status: error.status, message: error.message });
    }
}
export const getUserByIdController = async (req, res, next) => {
    const { params } = req;
    let payload;
    try {
        const user = await getUserById(params)
        return res.json({ ...user })
    } catch (error) {
        return res.status(error.status).json({ ok: false, status: error.status, message: error.message });
    }
}



