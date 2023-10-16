require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
const port = process.env.PORT || 8080; //  chose port from here like 8080, 3001
// const api = require("./data/db.json");
const mealView = require("./views/mealView");

const app = express();

app.use(express.json());

app.use(cors());

// const jsonData = api;
app.use((req: Request, res: Response, next: NextFunction) => {
	console.log(req.path, req.method);
	next();
});

app.use("/api/data", mealView);

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
