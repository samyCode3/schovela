import * as express from "express";
import {
  registerService,
  verifyUser,
  ResentOtp,
  UserInfo,
  LoginUser
} from "../services/auth.service"
import {
  registerSchema,
  verifySchema,
  UserInfoSchema,
  loginSchema,

} from "../utils/validation/joi";
export const registerController = async (req, res) => {
  const { body } = req;
  let payload;
  try {
    payload = await registerSchema(body);
    const registerUser = await registerService(payload);
    return res.status(registerUser.status).json({ ...registerUser });
  } catch (error) {
    return res.status(error.status).json({ ...error });
  }
};

export const VerifyUserAccount = async (req, res) => {
 const  {body, user} = req
 let payload
 try {
  payload = await verifySchema(body);
  const userControl = await verifyUser(payload, user);
  return res.status(userControl.status).json({ ...userControl });
} catch (error) {
  return res.status(500).json({ ...error });
}
}

// export const ResendUserOtp = async (req, res) => {
//    const {body} = req.body
//    try {
//     const user = await ResentOtp(body);
//     return res.status(user.status).json({ ...user });
//    } catch (error) {
//     return res.status(500).json({ ...error });
//    }
// }
export const LoginUserController = async (req, res) => {
  const  {body} = req
  let payload
  try {
   payload = await loginSchema(body);
   const user = await LoginUser(payload);
   return res.status(user.status).json({ ...user });
 } catch (error) {
   return res.status(500).json({ ...error });
 }
}
export const UserInfos = async (req, res) => {
  const  {body} = req
  let payload
  try {
   payload = await UserInfoSchema(body);
   const user = await UserInfo(payload, req.user);
   console.log(user)
   return res.status(user.status).json({ ...user });
 } catch (error) {
  console.log(error)
   return res.status(500).json({ ...error });
 }
}