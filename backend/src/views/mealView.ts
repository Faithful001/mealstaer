import express from "express";

const {
	getMeals,
	getMeal,
	createMeal,
	deleteMeal,
	updateMeal,
} = require("../controllers/mealController");

const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getMeals);
router.get("/:id", getMeal);
router.post("/", createMeal);
router.delete("/:id", deleteMeal);
router.patch("/:id", updateMeal);

module.exports = router;
