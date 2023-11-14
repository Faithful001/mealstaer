"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const { loginUser, signupUser } = require("../controllers/userController");
const router = express_1.default.Router();
const CLIENT_URL = "http://localhost:5173/";
router.get("/login/success", async (req, res) => {
    const user = req.user;
    // console.log("User from success route is: " + user);
    if (user) {
        res.status(200).json({
            message: "Successful login",
            user: user,
            // cookies: req.cookies,
        });
        console.log("Google login successful");
    }
    else {
        res.status(400).json({
            error: "Login unsuccessful",
        });
    }
});
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        message: "Login failed",
    });
    console.log("Google login failed");
});
router.get("/logout", (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error("Error destroying session:", error);
            res.status(500).send("Internal Server Error");
        }
        else {
            req.logout((error) => {
                if (error) {
                    console.error("Error during logout:", error);
                    res.status(500).send("Internal Server Error");
                }
                else {
                    res.redirect(`${CLIENT_URL}login`);
                }
            });
        }
    });
});
router.get("/google", passport_1.default.authenticate("google", {
    scope: ["email", "profile"],
}));
router.get("/google/callback", passport_1.default.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
}));
router.post("/login", loginUser);
router.post("/signup", signupUser);
module.exports = router;
//# sourceMappingURL=userView.js.map