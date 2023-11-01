import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express"; // Import Request, Response, and NextFunction types
const User = require("../models/userModel");

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ error: "Authorization token required" });
	}
	const token = authorization.split(" ")[1];

	try {
		const { _id } = jwt.verify(token, process.env.JWT_SEC);
		req.user = await User.findOne({ _id }).select("_id");
		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({ error: "Request is not authorized" });
	}
};

export default requireAuth;
