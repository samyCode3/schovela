import * as bcrypt from 'bcryptjs'


export const encrypt = async (payload:any, pretend : boolean = false) => {
    const salt = bcrypt.genSaltSync(pretend ? 20 : 10);
    const encrypt = await bcrypt.hashSync(payload, salt) 
    return encrypt
   
}


export const decrypt =  async (userData: any, hashedData: string) => {
   const data =  await bcrypt.compare(userData, hashedData) 
   return data
}



