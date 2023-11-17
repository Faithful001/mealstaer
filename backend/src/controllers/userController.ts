const User = require("../models/userModel");

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		req.session.user = user;
		const session = req.session;
		console.log(session);
		res.status(200).json({ user, session });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const signupUser = async (req, res) => {
	try {
		const { user_name, email, password } = req.body;
		const user = await User.signup(user_name, email, password);
		req.session.user = user;
		const session = req.cookies;
		console.log(session);
		res.status(200).json({ user, session });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = { loginUser, signupUser };
