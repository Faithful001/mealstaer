"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const MealSchema = new Schema({
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
}, { timestamps: true });
// MealSchema.statics.addToFavorite = async function (value) {
// 	const favorited = new Set();
// 	favorited.add(value);
// 	return favorited;
// };
const model = mongoose_1.default.model("Meal", MealSchema, "meals");
module.exports = model;
//# sourceMappingURL=mealModel.js.map