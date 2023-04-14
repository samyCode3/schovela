import * as speakeasy from "@levminer/speakeasy"

const today: any = new Date();
const tomorrow: any = new Date(today.getTime() + (24 * 60 * 60 * 1000));
const expireTime = (tomorrow - today)
let secret: any = speakeasy.generateSecret({ length: 4})
export let token = speakeasy.totp({
	secret: secret.base32,
	encoding: "base32",
})


export const tokenValidates = speakeasy.totp.verify({
	secret: secret.base32,
	encoding: "base32",
	token: token,
	time: expireTime,
})
