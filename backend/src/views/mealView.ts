import express from "express";

const {
	getMeals,
	getMeal,
	createMeal,
	deleteMeal,
	updateMeal,
} = require("../controllers/mealController");

const router = express.Router();

router.get("/", getMeals);
router.get("/:id", getMeal);
router.post("/", createMeal);
router.delete("/:id", deleteMeal);
router.patch("/:id", updateMeal);

module.exports = router;
