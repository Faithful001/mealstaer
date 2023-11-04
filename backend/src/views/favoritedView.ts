import express from "express";
import passport from "passport";
const {
	addToFavorites,
	getFavorites,
	getFavorite,
	deleteFavorite,
} = require("../controllers/favoritedController");

const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

router.use(isAuthenticated);

router.post("/", addToFavorites);
router.get("/", getFavorites);
router.get("/:id", getFavorite);
router.delete("/:id", deleteFavorite);

module.exports = router;
