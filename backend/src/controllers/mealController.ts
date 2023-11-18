const Meal = require("../models/mealModel");
const mongoose = require("mongoose");

const getMeals = async (req, res) => {
	try {
		const user_id = req.userr._id;
		// const userr = req.user;
		// const user_id = user ? user._id : userr._id;
		console.log("The user is: " + user_id);
		const mealData = await Meal.find({ user_id }).sort({ createdAt: -1 });
		res.status(200).json(mealData);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong " + error });
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
		const user_id = req.user_id;
		// const userr = req.user;
		// const user_id = user ? user._id : userr._id;
		// console.log("The user is: " + user_id);
		const { name, ingredients, steps } = req.body;
		const exists = await Meal.findOne({ name });
		if (exists) {
			throw new Error(`${name} already exists`);
		}
		const mealData = await Meal.create({
			name,
			ingredients,
			steps,
			user_id,
		});
		// req.session.meal = mealData;
		res.status(200).json(mealData);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong " + error });
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
		if (!mealData) {
			return res.status(404).json({ error: "No such meal" });
		}
		res.status(200).json(mealData);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong " + error });
	}
};

const updateMeal = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(400).json("Invalid id");
		}
		const mealData = await Meal.findOneAndUpdate({ _id: id }, { ...req.body });
		if (!mealData) {
			res.status(404).json({ error: "No such meal" });
		}
		res.status(200).json(mealData);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong " + error });
	}
};

module.exports = { getMeals, getMeal, createMeal, deleteMeal, updateMeal };
