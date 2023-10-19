import jwt from "jsonwebtoken";

const User = require("../models/userModel");

const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.JWT_SEC, { expires_in: "2d" });
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.login(email, password);
		const token = createToken(user._id);
		res.status(200).json({ user, token });
	} catch (error) {
		res.status(500).json({ error: "Login could not be completed " + error });
	}
};

const signupUser = async (req, res) => {
	try {
		const { user_name, email, password } = req.body;
		const exists = await User.findOne({ email });
		if (exists) {
			res.status(400).json({ error: "User already exists" });
		} else {
			const user = await User.signup(user_name, email, password);
			const token = createToken(user._id);
			req.status(200).json({ user, token });
		}
	} catch (error) {
		res.status(500).json({ error: "Signup could not be completed " + error });
	}
};

const loginWithGoogle = async (req, res) => {
	try {
		const { user_name, email } = req.body;
		const user = new User({ user_name, email });
		const exists = await User.findOne({ email });
		if (exists) {
			res.status(200).json(user);
		}
		const userData = await user.save();
		// if (req.ok) {
		res.status(200).json(userData);
		// } else {
		// 	res.status(400).json({ error: "Something went wrong" });
		// }
	} catch (error) {
		res.status(500).json({ error: "Something went wrong " + error });
	}
};

module.exports = { loginUser, signupUser, loginWithGoogle };
