"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { getMeals, getMeal, createMeal, deleteMeal, updateMeal, } = require("../controllers/mealController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express_1.default.Router();
router.use(isAuthenticated);
router.get("/", getMeals);
router.get("/:id", getMeal);
router.post("/", createMeal);
router.delete("/:id", deleteMeal);
router.patch("/:id", updateMeal);
module.exports = router;
//# sourceMappingURL=mealView.js.map