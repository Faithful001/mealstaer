import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MealSchema = new Schema(
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
	},
	{ timestamps: true }
);

// MealSchema.statics.addToFavorite = async function (value) {
// 	const favorited = new Set();

// 	favorited.add(value);

// 	return favorited;
// };

const model = mongoose.model("Meal", MealSchema, "meals");

module.exports = model;
