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
		},
		email: {
			type: String,
			required: false,
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
	// console.log(exists.email);
	if (exists) {
		throw new Error("Email already in use");
	}

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	const user = await this.create({ user_name, email, password: hash });
	return user;
};

UserSchema.statics.login = async function (email, password) {
	if (!email || !password) {
		throw new Error("All fields are required");
	}

	const user = await this.findOne({ email });
	if (user) {
		if (!user.password) {
			// user.user_name = user_name;
			// user.email = email;
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);

			user.password = hash;
			await user.save();
		} else if (user.password) {
			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				throw new Error("Incorrect password");
			}
		}
	} else {
		throw new Error("Incorrect email");
	}

	return user;
};

const model = mongoose.model("User", UserSchema, "mealUsers");

module.exports = model;
