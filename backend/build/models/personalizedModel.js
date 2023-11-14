"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PersonalizedSchema = new Schema({
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
const model = mongoose_1.default.model("Personalized", PersonalizedSchema, "personalized");
module.exports = model;
//# sourceMappingURL=personalizedModel.js.map