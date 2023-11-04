import express from "express";
import passport from "passport";
const {
	getMeals,
	getMeal,
	createMeal,
	deleteMeal,
	updateMeal,
} = require("../controllers/mealController");

const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

router.use(isAuthenticated);

router.get("/", getMeals);
router.get("/:id", getMeal);
router.post("/", createMeal);
router.delete("/:id", deleteMeal);
router.patch("/:id", updateMeal);

module.exports = router;
