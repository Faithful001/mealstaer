const Favorited = require("../models/favoritedModel");
import mongoose from "mongoose";

const addToFavorites = async (req, res) => {
	try {
		const user_id = req.user._id;
		const { name, ingredients, steps } = req.body;
		const exists = await Favorited.findOne({ name });
		if (exists) {
			res.status(400).json({ error: "Meal already exists" });
		}
		const favorite = new Favorited({ name, ingredients, steps, user_id });
		const mealData = await favorite.save();
		res.status(200).json(mealData);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong " + error });
	}
};

const getFavorites = async (req, res) => {
	try {
		const user_id = req.user._id;
		const mealData = await Favorited.find({ user_id }).sort({ createdAt: -1 });
		res.status(200).json(mealData);
	} catch (error) {
		req.status(500).json({ error: "An error occured " + error });
	}
};

// get favorites by id

const getFavorite = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ error: "No such meal in favorite" });
		}
		const mealData = await Favorited.findById(id);
		res.status(200).json(mealData);
	} catch (error) {
		req.status(500).json({ error: "An error occured " + error });
	}
};

//delete from db
const deleteFavorite = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ error: "No such meal in favorite" });
		}
		const mealData = await Favorited.findOneAndDelete({ _id: id });
		res.status(200).json(mealData);
	} catch (error) {
		req.status(500).json({ error: "Could not remove from favorites " + error });
	}
};

module.exports = { addToFavorites, getFavorites, getFavorite, deleteFavorite };

// const addToFavorites = async (req, res) => {
// 	try {
// 		const favorited = new Set();
// 		const saved = new Set();
// 		const { favoritedList, savedList } = req.body;
// 		favorited.add({ favoritedList });
// 		saved.add({ savedList });

// 		const favorite = new Favorited({ favorited, saved });
// 		const mealData = await favorite.save();
// 		res.status(200).json(mealData);
// 	} catch (error) {
// 		res.status(500).json({ error: "Something went wrong " + error });
// 	}
// };
