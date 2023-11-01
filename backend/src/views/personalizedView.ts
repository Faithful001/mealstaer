import express from "express";
import passport from "passport";
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

router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	getAllPersonalized
);
router.get(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	getPersonalized
);
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	createPersonalized
);
router.patch(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	updatePersonalized
);
router.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	deletePersonlized
);

module.exports = router;
