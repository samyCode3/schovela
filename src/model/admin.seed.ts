import { UserModel}  from './user.model'
import {encrypt} from  '../helper/encryption'
import { ROLE } from '../interface/user.interface'
import { StatusCodes } from 'http-status-codes'
export const seedData = async () => {
 const  seedIn = { fullname : 'femi fatokun', email : "femifatokun@gmail.com", password : 'password@#3', role: ROLE.admin, status : true,}
 const user = await UserModel.findOne({ where :  { email :  seedIn.email}})
 if(user) {
  console.log("Admin already existed")
 } else {
  seedIn.password = await encrypt(seedIn.password)
 await UserModel.create({ ...seedIn })
  console.log("ADMIN is Created")
 }
 
} 