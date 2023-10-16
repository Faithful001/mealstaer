const Meal = require("../models/mealModel");
const mongoose = require("mongoose");
// const { Request, Response } = require("express")

const getMeals = async (req, res) => {
	try {
		const mealData = await Meal.find({}).sort({ createdAt: -1 });
		res.status(200).json(mealData);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong" + error });
	}
};

//get meals by id
const getMeal = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(400).json({ error: "Invalid id" });
		}
		const mealData = await Meal.findById(id);
		if (!mealData) {
			res.status(400).json({ error: "No such meal" });
		}
		res.status(200).json(mealData);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong" + error });
	}
};

//createMeal
const createMeal = async (req, res) => {
	try {
		const { name, ingredients, steps } = req.body;
		const mealData = await Meal.create({
			name,
			ingredients,
			steps,
		});
		res.status(200).json(mealData);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong" + error });
	}
};

//delete a meal

const deleteMeal = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(400).json({ error: "Invalid id" });
		}
		const mealData = await Meal.findOneAndDelete({ _id: id });
		res.status(200).json(mealData);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong" + error });
	}
};

const updateMeal = async (res, req) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(400).json("Invalid id");
		}
		const mealData = await Meal.findOneAndUpdate({ _id: id }, { ...req.body });
		res.status(200).json(mealData);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong" + error });
	}
};

module.exports = { getMeals, getMeal, createMeal, deleteMeal, updateMeal };