import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

// const RecipeSchema = new Schema({
// 	name: {
// 		type: String,
// 		required: true,
// 		unique: true,
// 	},
// 	image_url: {
// 		type: String,
// 		required: false,
// 	},
// 	ingredients: {
// 		type: [String],
// 		required: true,
// 	},
// 	steps: {
// 		type: [String],
// 		required: true,
// 	},
// });

const UserSchema = new Schema(
	{
		user_name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

UserSchema.statics.signup = async function (user_name, email, password) {
	if (!user_name || !email || !password) {
		throw new Error("All fields are required");
	}

	if (!validator.isEmail(email)) {
		throw new Error("Email is not valid");
	}

	if (!validator.isStrongPassword(password)) {
		throw new Error("Password is not strong enough");
	}

	const exists = await this.findOne({ email });
	if (exists) {
		throw new Error("Email already in use");
	}

	const saltPassword = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(password, saltPassword);

	const user = await this.create({ user_name, email, password: hashPassword });
	return user;
};

UserSchema.statics.login = async function (email, password) {
	if (!email || !password) {
		throw new Error("All fields are required");
	}

	const user = await this.findOne({ email });
	if (!user) {
		throw new Error("Incorrect email");
	}

	const match = await bcrypt.compare(password, user.password);
	if (!match) {
		throw new Error("Incorrect password");
	}

	return user;
};

const model = mongoose.model("User", UserSchema, "mealUsers");

module.exports = model;
