require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
const port = process.env.PORT || 8080; //  chose port from here like 8080, 3001
// const api = require("./data/db.json");
const mealView = require("./views/mealView");
const favoritedView = require("./views/favoritedView");
// const userViewGoogle = require("./views/userViewGoogle");
const userView = require("./views/userView");

const app = express();

//middleware
app.use((req, res, next) => {
	res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
	next();
});

app.use(
	cors({
		origin: "http://localhost:5173",
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
// app.use("/api/user", userViewGoogle);
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
