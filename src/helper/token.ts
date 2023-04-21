import * as jwt from 'jsonwebtoken'
import config from '../config/default';

const bearer = config.token.BEARER_TOKEN

export const bearerToken =  (data: any) => {
    return  jwt.sign({data}, bearer)
}

export const verifyTokens = async (payload: string, Tokens: string) => {
     return await jwt.verify(payload, Tokens)
}
