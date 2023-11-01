import express from "express";
import passport from "passport";
const { loginUser, signupUser } = require("../controllers/userController");
import jwt from "jsonwebtoken";
const User = require("../models");

const router = express.Router();

// interface User {
// 	_id: string;
// 	username: string;
// 	token: string;
// }

const CLIENT_URL = "http://localhost:5173/";

const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.JWT_SEC, { expiresIn: "2d" });
};
router.get("/login/success", (req, res) => {
	// const tokenValue = createToken(req.user._id);
	// const user = User
	if (req.user) {
		res.status(200).json({
			success: true,
			message: "Successful login",
			user: req.user,
			// token: tokenValue,
		});
		console.log("Google login successful");
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		success: false,
		message: "Login failed",
	});
	console.log("Google login failed");
});

router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["email", "profile"],
		session: false,
	})
);

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: CLIENT_URL,
		failureRedirect: "/login/failed",
		session: false,
	})
);

router.post("/login", loginUser);

router.post("/signup", signupUser);

module.exports = router;
