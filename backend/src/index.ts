require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
// import session from "express-session";
import cookieParser from "cookie-parser";
// const MongoDBStore = require("connect-mongodb-session")(session);
import cookieSession from "cookie-session";
const port = process.env.PORT || 8080;
const mealView = require("./views/mealView");
const favoritedView = require("./views/favoritedView");
const userView = require("./views/userView");
const personalizedView = require("./views/personalizedView");
// const User = require("./models/userModel");
// const URL = require("./URL");
require("./controllers/passport");

const app = express();

// middleware
const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000;

// const store = new MongoDBStore({
// 	uri: process.env.MONGO_URI, // Replace with your MongoDB URI
// 	collection: "sessions",
// 	expires: twoDaysInMilliseconds,
// 	// connectionOptions: {
// 	// 	useNewUrlParser: true,
// 	// 	useUnifiedTopology: true,
// 	// },
// });

// store.on("error", (error) => {
// 	console.error("Session Store Error:", error);
// });

// app.use(
// 	session({
// 		secret: process.env.COOKIE_KEY,
// 		resave: false,
// 		saveUninitialized: true,
// 		store: store,
// 		cookie: {
// 			maxAge: twoDaysInMilliseconds,
// 			expires: new Date(Date.now() + twoDaysInMilliseconds),
// 		},
// 	})
// );

app.use(
	cookieSession({
		name: "session",
		keys: [process.env.COOKIE_KEY],
		maxAge: twoDaysInMilliseconds,
		expires: new Date(Date.now() + twoDaysInMilliseconds),
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
