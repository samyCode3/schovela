import * as bcrypt from 'bcryptjs'

export const encryptData = async (payload: any) => {
     const salt = bcrypt.genSaltSync(10)
     const encrypt = await bcrypt.hashSync(payload, salt) 
     return encrypt
    
}

export const decryptData =  async (userData: any, hashedData: any) => {
    return await bcrypt.compare(userData, hashedData)
}
