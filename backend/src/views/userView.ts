import express from "express";
import passport from "passport";
// import jwt from "jsonwebtoken";
import jwtUtil from "../utils/jwt.util";
const {
	loginUser,
	signupUser,
	recoverAccount,
	verifyOTP,
	resetPassword,
} = require("../controllers/userController");

const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const CLIENT_URL = "https://mealstaer.vercel.app";

interface User {
	_id: string;
	user_name?: string;
	email?: string;
	password?: string;
}

router.get("/login/success", async (req, res) => {
	const user: User | undefined = req.user as User;
	if (!user) {
		// Handle the case where user is undefined
		res.status(400).json({
			error: "User not found",
		});
		return;
	}

	const token = jwtUtil.createToken(user._id, "2d");
	console.log("jwt token:", token);
	console.log("User from success route is: " + user);
	res.status(200).json({
		user: user,
		token: token,
	});
	console.log("Google login successful");
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		message: "Login failed",
	});
	console.log("Google login failed");
});

router.get("/logout", (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			console.error("Error destroying session:", error);
			res.status(500).send("Internal Server Error");
		} else {
			req.logout((error) => {
				if (error) {
					console.error("Error during logout:", error);
					res.status(500).send("Internal Server Error");
				} else {
					res.redirect(`${CLIENT_URL}login`);
				}
			});
		}
	});
});

router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["email", "profile"],
	})
);

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/recover-account", recoverAccount);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", isAuthenticated, resetPassword);

module.exports = router;
