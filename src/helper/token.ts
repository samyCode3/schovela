import * as jwt from 'jsonwebtoken'
import * as config from 'config'
const bearer = config.get<string>('token.BEARER_TOKEN')
const access = config.get<string>('token.ACCESS_TOKEN')
export const bearerToken =  (data: any) => {
    return  jwt.sign({data}, bearer)
}
export const accessToken =  (payload: any) => {
    return  jwt.sign({data:{ email: payload.email, fullname: payload.fullname, id: payload.id}}, access)
}

export const verifyTokens = async (payload: any, Tokens: string) => {
     return await jwt.verify(payload, Tokens)
}
