import jwt from "jsonwebtoken";

const User = require("../models/userModel");

const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.JWT_SEC, { expiresIn: "2d" });
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		const token = createToken(user._id);
		res.status(200).json({ user, token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const signupUser = async (req, res) => {
	try {
		const { user_name, email, password } = req.body;
		const user = await User.signup(user_name, email, password);
		const token = createToken(user._id);
		res.status(200).json({ user, token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// const loginWithGoogle = async (req, res) => {
// 	try {
// 		const { user_name, email } = req.body;
// 		const exists = await User.findOne({ email });
// 		// console.log(exists.email);
// 		if (!exists) {
// 			const user = await User.create({ user_name, email });
// 			const token = createToken(user._id);
// 			res.status(200).json({ user, token });
// 		} else {
// 			const user = await User.findOne({ email });
// 			const token = createToken(user._id);
// 			res.status(200).json({ user, token });
// 		}
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// };

module.exports = { loginUser, signupUser };
