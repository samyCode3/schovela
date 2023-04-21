export const OtpGen = (length) => {
	const otp = Math.floor(Math.random() * length * 100000);
	if(`${otp}`.length != 6){
		return OtpGen(length);
	}
	return otp
}  