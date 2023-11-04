const Favorited = require("../models/favoritedModel");
import mongoose from "mongoose";

const addToFavorites = async (req, res) => {
	try {
		const user = req.session.user;
		const userr = req.user;
		const user_id = user ? user._id : userr._id;
		// console.log("The user is: " + user_id);
		const { name, ingredients, steps, favorited } = req.body;
		const exists = await Favorited.findOne({ name });
		if (exists) {
			return res.status(400).json({ error: "Meal already exists" });
		}
		const favorite = new Favorited({
			name,
			ingredients,
			steps,
			user_id,
			favorited,
		});
		const mealData = await favorite.save();
		res.status(200).json(mealData);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong " + error });
	}
};

const getFavorites = async (req, res) => {
	try {
		const user = req.session.user;
		const userr = req.user;
		const user_id = user ? user._id : userr._id;
		// console.log("The user is: " + user_id);
		const mealData = await Favorited.find({ user_id }).sort({ createdAt: -1 });
		res.status(200).json(mealData);
	} catch (error) {
		res.status(500).json({ error: "An error occurred " + error });
	}
};

const getFavorite = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ error: "No such meal in favorite" });
		}
		const mealData = await Favorited.findById(id);
		res.status(200).json(mealData);
	} catch (error) {
		res.status(500).json({ error: "An error occurred " + error });
	}
};

const deleteFavorite = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(400).json({ error: "Invalid id" });
		}
		const favoritedData = await Favorited.findOneAndDelete({ _id: id });
		if (!favoritedData) {
			return res.status(404).json({ error: "No such meal" });
		}
		res.status(200).json(favoritedData);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong " + error });
	}
};

module.exports = { addToFavorites, getFavorites, getFavorite, deleteFavorite };
