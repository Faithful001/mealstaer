require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 8080;
const mealView = require("./views/mealView");
const favoritedView = require("./views/favoritedView");
const userView = require("./views/userView");
const personalizedView = require("./views/personalizedView");
// const User = require("./models/userModel");
// const URL = require("./URL");
require("./controllers/passport");

const app = express();

//middleware
app.use(
	session({
		secret: process.env.COOKIE_KEY,
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 60 * 48,
		},
	})
);

app.use(cookieParser());

app.use((req, res, next) => {
	res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
	next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:5173",
		method: ["GET", "POST", "PATCH", "DELETE"],
		credentials: true,
	})
);

app.options("*", cors());

app.use(express.json());
app.use(morgan("combined"));

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// app.use(async (req, res, next) => {
// 	if (req.session && req.session.user_id) {
// 		try {
// 			const user = await User.findById(req.session.user_id);
// 			req.session.user = user;
// 		} catch (err) {
// 			console.error("Error retrieving user data:", err);
// 		}
// 	}
// 	next();
// });

//middleware routes
app.use("/api/data", mealView);
app.use("/api/fave", favoritedView);
app.use("/api/personalized", personalizedView);
app.use("/api/auth", userView);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(port, () => {
			console.log(`JSON server is running at http://localhost:${port}`);
		});
	})
	.catch((error: any) => {
		console.log(error);
	});
