"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const FavoritedSchema = new Schema({
    name: {
        type: String,
        required: true,
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
}, { timestamps: true });
const FavoriteModel = mongoose_1.default.model("Favorite", FavoritedSchema, "favoritedMeals");
module.exports = FavoriteModel;
//# sourceMappingURL=favoritedModel.js.map