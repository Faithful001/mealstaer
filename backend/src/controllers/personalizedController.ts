import mongoose from "mongoose";
const Personalized = require("../models/personalizedModel");

const getAllPersonalized = async (req, res) => {
	try {
		const user = req.session.user;
		const userr = req.user;
		const user_id = user ? user._id : userr._id;
		// console.log("The user is: " + user_id);
		const personalizedMeals = Personalized.find({ user_id }).sort({
			createdAt: -1,
		});
		res.status(200).json(personalizedMeals);
	} catch (error) {
		res.status(500).json({ error: "An error occured " + error });
	}
};

const getPersonalized = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(400).json({ error: "Invalid id provided" });
		}
		const personalizedMeal = await Personalized.findById(id);
		if (!personalizedMeal) {
			res.status(404).json({ error: "Personalized meal not found" });
		} else {
			res.status(200).json(personalizedMeal);
		}
	} catch (error) {
		res.status(200).json({ error: "An error occcured " + error });
	}
};

const createPersonalized = async (req, res) => {
	try {
		const user = req.session.user;
		const userr = req.user;
		const user_id = user ? user._id : userr._id;
		// console.log("The user is: " + user_id);
		const { name, ingredients, steps } = req.body;
		const exists = await Personalized.findOne({ name });
		if (exists) {
			return res.status(400).json({ error: `${name} already exists` });
		}
		const personalizedMeals = new Personalized({
			name,
			ingredients,
			steps,
			user_id,
		});
		await personalizedMeals.save();
		res.status(200).json(personalizedMeals);
	} catch (error) {
		res.status(500).json({ error: "An error occured " + error });
	}
};

const updatePersonalized = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(404).json({ error: "Invalid id" });
		}
		const personalizedMeal = await Personalized.findOneAndUpdate(
			{ _id: id },
			{
				...req.body,
			}
		);
		if (!personalizedMeal) {
			res.status(404).json({ error: "Personalized meal not found" });
		} else {
			res.status(200).json(personalizedMeal);
		}
	} catch (error) {
		res.status(500).json({ error: "An error occured " + error });
	}
};

const deletePersonlized = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(404).json({ error: "Invalid id" });
		}
		const personalizedMeal = await Personalized.findOneAndDelete({ _id: id });
		if (!personalizedMeal) {
			res.status(404).json({ error: "Personalized meal not found" });
		} else {
			res.status(200).json(personalizedMeal);
		}
	} catch (error) {
		res.status(500).json({ error: "An error occured " + error });
	}
};

module.exports = {
	getAllPersonalized,
	getPersonalized,
	createPersonalized,
	updatePersonalized,
	deletePersonlized,
};
