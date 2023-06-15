import * as express from 'express'
import { De_elevateModerator, ElevateUser, ElevateUserToModerator } from '../../services/admin/admin.service'
import { ElevateValidation } from '../../utils/validation/admin.joi'

export const ElevateUsers = async (req, res) => {
    const { body } = req;
    let payload;
    try {
      payload = await ElevateValidation(body);
      const registerUser = await ElevateUser(payload);
      return res.json({ ...registerUser })
    } catch (error) {
      return res.status(error.status).json({ok: false, status: error.status, message : error.message});
    }
  };
export const ElevateToModeratorController = async (req, res) => {
    const { body } = req;
    let payload;
    try {
      payload = await ElevateValidation(body);
      const registerUser = await ElevateUserToModerator(payload);
      return res.json({ ...registerUser })
    } catch (error) {
      return res.status(error.status).json({ok: false, status: error.status, message : error.message});
    }
  };
export const De_elevateModeratorController = async (req, res) => {
    const { body } = req;
    let payload;
    try {
      payload = await ElevateValidation(body);
      const registerUser = await De_elevateModerator(payload);
      return res.json({ ...registerUser })
    } catch (error) {
      return res.status(error.status).json({ok: false, status: error.status, message : error.message});
    }
  };
