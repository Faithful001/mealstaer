import jwt from "jsonwebtoken";
const User = require("../models/userModel");

const verifyJwt = async (req, res, next) => {
	const { token } = req.cookie;
	try {
		const { _id } = jwt.verify(token, process.env.JWT_SEC);
		req.user = await User.findOne({ _id }).select("_id");
		next();
	} catch (error) {
		res.clearCookie("token");
		res.status(401).json({ error: "You are not authorized " + error });
	}
};

module.exports = verifyJwt;
