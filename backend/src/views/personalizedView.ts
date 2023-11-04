import express from "express";
import passport from "passport";
const {
	getAllPersonalized,
	getPersonalized,
	createPersonalized,
	updatePersonalized,
	deletePersonlized,
} = require("../controllers/personalizedController");

const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

router.use(isAuthenticated);

router.get("/", getAllPersonalized);
router.get("/:id", getPersonalized);
router.post("/", createPersonalized);
router.patch("/:id", updatePersonalized);
router.delete("/:id", deletePersonlized);

module.exports = router;
