import * as jwt from 'jsonwebtoken'
import config from '../config/default';

const bearer = config.token.BEARER_TOKEN
const refresh = config.token.REFRESH_TOKEN


export const bearerToken =  (data: any) => {
    return  jwt.sign({data}, bearer)
}

export const refreshToken = (data: any) => {
    return  jwt.sign({data}, refresh)
}
export const verifyTokens = async (payload: string, Tokens: string) => {
     return await jwt.verify(payload, Tokens)
}
