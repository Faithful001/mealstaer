import express from "express";

declare module "express" {
	interface Request {
		session: any; // You might want to specify the actual session type
	}
}
