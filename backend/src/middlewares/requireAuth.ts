import jwt from "jsonwebtoken";
const User = require("../models/userModel");
const UserGoog = require("../models/userModelGoogle");

const requireAuth = async (req, res, next) => {
	const { authorization } = req.headers;

	const token = authorization.split(" ")[1];

	if (!authorization) {
		return res.status(401).json({ error: "Authorization token required" });
	}
	try {
		const _id = jwt.verify(token, process.env.JWT_SEC);
		req.user = await User.findOne({ _id }).select("_id");
		// req.user_google = await UserGoog({ _id }).select("_id");
		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({ error: "Request is not authorized" });
	}
};

module.exports = requireAuth;