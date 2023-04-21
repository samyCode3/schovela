import * as express from "express";
import {
  registerService,
  verifyUser,
  ResentOtp,
  UserInfo,
  LoginUser,
  forgottenPassword,
  ResetPassword
} from "../services/auth.service"
import {
  registerSchema,
  verifySchema,
  UserInfoSchema,
  loginSchema,
  ForgottenPasswordSchema,
  ResetPasswordSchema 

} from "../utils/validation/joi";
import {
  StatusCodes
 } from 'http-status-codes'
export const registerController = async (req, res) => {
  const { body } = req;
  let payload;
  try {
    payload = await registerSchema(body);
    const registerUser = await registerService(payload);
    return res.status(registerUser.status).json({ ...registerUser });
  } catch (error) {
    return res.status(error.status).json({ok: false, status: error.status, message : error.message});
  }
};

export const VerifyUserAccountController = async (req, res) => {
 const  {body, user} = req
 let payload
 try {
  payload = await verifySchema(body);
  const userControl = await verifyUser(payload, user);
  return res.status(userControl.status).json({ ...userControl });
} catch (error) {
  return res.status(error.status).json({ok: false, status: error.status, message : error.message});
}
}

export const ResendUserOtp = async (req, res) => {
   const {user} = req
   try {
    const users= await ResentOtp(user);
    return res.status(users.status).json({ ...users });
   } catch (error) {
    return res.status(error.status).json({ok: false, status: error.status, message : error.message});
   }
}
export const LoginUserController = async (req, res) => {
  const  {body} = req
  let payload
  try {
   payload = await loginSchema(body);
   const user = await LoginUser(payload);
   return res.status(user.status).json({ ...user });
 } catch (error) {
  console.log(error)
   return res.status(500).json({ ...error });
 }
}
export const UserInfosController = async (req, res) => {
  const  {body} = req
  let payload
  try {
   payload = await UserInfoSchema(body);
   const user = await UserInfo(payload, req.user);
   return res.status(user.status).json({ ...user });
 } catch (error) {
  console.log(error)
   return res.status(error.status).json({ok: false, status: error.status, message : error.message});
 }
}

export const ForgottenPasswordController = async (req, res) => {
 const {body} = req
 let payload
 try {
    payload = await ForgottenPasswordSchema(body)
    const user = await forgottenPassword(payload)
    return res.status(user.status).json({ ...user });
 } catch (error) {
  console.log(error)
  return res.status(error.status).json({ok: false, status: error.status, message : error.message});
 }
}

export const ResetController = async (req, res) => {
  const {body} = req
  let payload
  try {
    payload = await ResetPasswordSchema(body)
    const user = await ResetPassword(payload)
    return res.status(user.status).json({ ...user });
 } catch (error) {
  console.log(error)
  return res.status(error.status).json({ok: false, status: error.status, message : error.message});
 }
}