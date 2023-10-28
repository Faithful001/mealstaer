require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
const port = process.env.PORT || 8080;
const mealView = require("./views/mealView");
const favoritedView = require("./views/favoritedView");
const userView = require("./views/userView");
const personalizedView = require("./views/personalizedViews");

const app = express();

//middleware
app.use((req, res, next) => {
	res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
	next();
});

app.use(
	cors({
		origin: process.env.LOCAL_URL,
		method: ["GET", "POST", "PATCH", "DELETE"],
	})
);

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
app.use("/api/user", userView);

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
