const Favorited = require("../models/favoritedModel");

const addToFavorites = async (req, res) => {
	try {
		const { name, ingredients, steps } = req.body;
		const exists = await Favorited.findOne({ name });
		if (exists) {
			res.status(400).json({ error: "Meal already exists" });
		}
		const favorite = new Favorited({ name, ingredients, steps });
		const mealData = await favorite.save();
		res.status(200).json(mealData);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong " + error });
	}
};

module.exports = addToFavorites;

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
