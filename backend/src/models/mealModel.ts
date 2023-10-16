import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MealSchema = new Schema(
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
		favorited: {
			type: [String],
			required: false,
		},
		saved: {
			type: [String],
			required: false,
		},
	},
	{ timestamps: true }
);

const model = mongoose.model("Meal", MealSchema);

module.exports = model;
