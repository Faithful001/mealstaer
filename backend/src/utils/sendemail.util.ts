import nodemailer from "nodemailer";
import { OTPMethods } from "./otp.util";
const OTP = require("../models/otpModel");
require("dotenv").config();

export const sendOTPToEmail = async (email: string) => {
	try {
		const { hashedOTP, stringifiedOTP } = await OTPMethods.createOTPForClient();

		// console.log("otp", otp);
		// console.log("otpUser", otpUser);

		// const returnToClient = {
		// 	user_id: otpModel.user_id,
		// 	status: otpModel.status,
		// };

		const transporter = nodemailer.createTransport({
			host: process.env.TRANSPORTER_HOST,
			secure: false,
			port: 587,
			auth: {
				user: process.env.TRANSPORTER_USER,
				pass: process.env.TRANSPORTER_PASSWORD,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		const mailOptions = {
			from: process.env.TRANSPORTER_HOST,
			to: email,
			subject: "Account Recovery OTP",
			text: `Your OTP for account recovery is: ${stringifiedOTP}. \n Your OTP expires in 15 minutes.`,
		};

		transporter.sendMail(mailOptions, (error: any, info: any) => {
			if (error) {
				console.error("Error sending email:", error);
				throw new Error(
					"An error occured while sending email. Please try again"
				);
			} else {
				console.log("Email sent:", info.response);
			}
		});

		return hashedOTP;
	} catch (error: any) {
		throw error;
	}
};
