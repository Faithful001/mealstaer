import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FavoritedSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		image_url: {
			type: String,
			required: false,
		},
		ingredients: {
			type: [String],
			required: true,
		},
		steps: {
			type: [String],
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
