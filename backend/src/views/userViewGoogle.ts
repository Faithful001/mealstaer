import express from "express";

const loginWithGoogle = require("../controllers/userControllerGoogle");

const router = express.Router();

router.post("/login-google", loginWithGoogle);

module.exports = router;
