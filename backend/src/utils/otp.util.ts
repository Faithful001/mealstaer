const OTP = require("../models/otpModel");
import bcrypt from "bcryptjs";

export class OTPMethods {
	public static async createOTPForClient() {
		try {
			const otp = Math.floor(Math.random() * Math.floor(9000) + 1000);
			const stringifiedOTP = otp.toString();
			const salt = await bcrypt.genSaltSync(10);
			const hashedOTP = await bcrypt.hash(stringifiedOTP, salt);
			return { hashedOTP, stringifiedOTP };
		} catch (error) {
			throw error;
		}
	}

	public static async createOTPForServer(hashedOTP: string, user_id: string) {
		try {
			const otpModel = await OTP.create({
				otp: hashedOTP,
				user_id,
				status: "active",
			});

			const returnToClient = {
				user_id: otpModel.user_id,
				status: otpModel.status,
			};

			return returnToClient;
		} catch (error) {
			throw error;
		}
	}

	public static async updateOTPForServer(
		hashedOTP: string,
		otp_user_id: string
	) {
		try {
			const otpModel = await OTP.findOne({ user_id: otp_user_id });
			console.log("otpModel", otpModel);

			otpModel.otp = hashedOTP;
			otpModel.status = "active";
			await otpModel.save();

			const returnToClient = {
				user_id: otpModel.user_id,
				status: otpModel.status,
			};

			return returnToClient;
		} catch (error) {
			console.error("error updating otp");
			throw error;
		}
	}

	public static async changeOTPStatusToUsed(otp_user_id: string) {
		try {
			const otpModel = await OTP.findOne({ user_id: otp_user_id });
			console.log("otpModel", otpModel);

			otpModel.status = "used";
			await otpModel.save();

			const returnToClient = {
				user_id: otpModel.user_id,
				status: otpModel.status,
			};

			return returnToClient;
		} catch (error: any) {
			console.error("error changing otp status to used");
			throw error;
		}
	}
	public static async changeOTPStatusToExpired(otp_user_id: string) {
		try {
			const otpModel = await OTP.findOne({ user_id: otp_user_id });
			console.log("otpModel", otpModel);

			otpModel.status = "expired";
			await otpModel.save();

			const returnToClient = {
				user_id: otpModel.user_id,
				status: otpModel.status,
			};

			return returnToClient;
		} catch (error: any) {
			console.error("error changing otp status to expired");
			throw error;
		}
	}
}
