import * as express from 'express'
import { ElevateUser } from '../services/admin.service'


export const ElevateUsers = async (req, res) => {
    const { params } = req;
    let payload;
    try {
      payload = await params;
      const registerUser = await ElevateUser(payload);
      return res.json({ ...registerUser })
    } catch (error) {
      return res.status(error.status).json({ok: false, status: error.status, message : error.message});
    }
  };
