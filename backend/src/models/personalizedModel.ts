import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PersonalizedSchema = new Schema(
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

const model = mongoose.model(
	"Personalized",
	PersonalizedSchema,
	"personalized"
);

module.exports = model;
