export const OtpGen = (length) => {
	const otp = Math.floor(Math.random() * length * 1000)
	return otp
}  