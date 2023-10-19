import express from "express";
const {
	addToFavorites,
	getFavorites,
	getFavorite,
	deleteFavorite,
} = require("../controllers/favoritedController");

const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.post("/", addToFavorites);
router.get("/", getFavorites);
router.get("/:id", getFavorite);
router.delete("/:id", deleteFavorite);

module.exports = router;
