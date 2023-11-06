import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FavoritedSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		ingredients: {
			type: [String],
			required: true,
		},
		steps: {
			type: [String],
			required: true,
		},
		user_id: {
			type: String,
			required: true,
		},
		original_meal_id: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const FavoriteModel = mongoose.model(
	"Favorite",
	FavoritedSchema,
	"favoritedMeals"
);

module.exports = FavoriteModel;
