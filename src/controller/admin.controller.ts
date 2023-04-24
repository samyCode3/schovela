import * as express from 'express'
import { ElevateUser } from '../services/admin.service'
import { ElevateValidation } from '../utils/validation/admin.joi'

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
