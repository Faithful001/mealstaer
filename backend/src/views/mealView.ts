import express from "express";
import passport from "passport";
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

router.get("/", passport.authenticate("jwt", { session: false }), getMeals);
router.get("/:id", passport.authenticate("jwt", { session: false }), getMeal);
router.post("/", passport.authenticate("jwt", { session: false }), createMeal);
router.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	deleteMeal
);
router.patch(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	updateMeal
);

module.exports = router;
