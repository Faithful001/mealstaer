import { time, timeStamp } from "console";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OTPSchema = new Schema(
	{
		otp: {
			type: String,
			required: true,
		},
		user_id: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			default: "active",
			enum: ["active", "used", "expired"],
		},
	},
	{ timestamps: true }
);

const model = mongoose.model("OTP", OTPSchema, "userOTP");

module.exports = model;
