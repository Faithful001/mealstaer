import express from "express";
const {
	loginUser,
	signupUser,
	loginWithGoogle,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/login-google", loginWithGoogle);
router.post("/signup", signupUser);

module.exports = router;
