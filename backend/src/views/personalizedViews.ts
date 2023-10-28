import express from "express";

const {
	getAllPersonalized,
	getPersonalized,
	createPersonalized,
	updatePersonalized,
	deletePersonlized,
} = require("../controllers/personalizedController");

const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getAllPersonalized);
router.get("/:id", getPersonalized);
router.post("/", createPersonalized);
router.patch("/:id", updatePersonalized);
router.delete("/:id", deletePersonlized);

module.exports = router;
