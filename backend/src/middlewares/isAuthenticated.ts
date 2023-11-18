import jwtUtil from "../utils/jwt.util";
import jwt from "jsonwebtoken";
const User = require("../models/userModel");
require("dotenv").config();

const isAuthenticated = async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ error: "Authorization token required" });
	}

	const token = authorization.split(" ")[1];
	try {
		const { _id } = jwt.verify(token, process.env.JWT_SEC);

		req.userr = await User.findOne({ _id }).select("_id");
		next();
	} catch (error: any) {
		console.log(error);
		res.status(401).json({ error: "Request is not authorized" });
	}
	// if (req.session.user || req.user) {
	// 	console.log("User is authenticated:", req.session.user);
	// 	console.log("Request User:", req.user);
	// 	return next();
	// } else {
	// 	console.log("User is not authenticated");
	// 	return res.status(401).json({ error: "User is unauthorized" });
	// }
};

module.exports = isAuthenticated;
