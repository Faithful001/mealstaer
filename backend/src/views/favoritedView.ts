import express from "express";
const addToFavorites = require("../controllers/favoritedController");

const router = express.Router();

router.post("/", addToFavorites);

module.exports = router;
