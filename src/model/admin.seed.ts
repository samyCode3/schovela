import { UserModel}  from './user.model'
import {encrypt} from  '../helper/encryption'
export const seedData = async () => {
 const  seedIn = { fullname : 'samson onifade', email : "femifatokun@gmail.com", password : 'password@#3', role: 'ADMIN', status : true,}
 const user = await UserModel.findOne({ where :  { email :  seedIn.email}})
 if(user) {
  console.log("Admin already existed")
    return null
 }
seedIn.password = await encrypt(seedIn.password)
await UserModel.create({ ...seedIn }) 
console.log("ADMIN is Created") 
}