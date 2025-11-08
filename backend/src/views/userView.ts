import express from "express";
import passport from "passport";
// import jwt from "jsonwebtoken";
import jwtUtil from "../utils/jwt.util";
const {
  loginUser,
  signupUser,
  recoverAccount,
  verifyOTP,
  resetPassword,
} = require("../controllers/userController");
import { config } from "dotenv";
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";
// import User, { IUser } from "../models/userModel";
const User = require("../models/userModel");
import { Request, Response, NextFunction } from "express";

config();

// Extend Express Request type to include user property
// declare global {
//   namespace Express {
//     interface Request {
//       user?: IUser;
//     }
//   }
// }

const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const LOCAL_CLIENT_URL = "http://localhost:5173";
const PROD_CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? "https://mealstaerr.vercel.app"
    : "http://localhost:5173/login";

interface User {
  _id: string;
  user_name?: string;
  email?: string;
  password?: string;
}

router.get("/login/success", (req, res) => {
  if (req.user) {
    const user = req.user as User;
    const token = jwtUtil.createToken(user._id, "2d");
    return res.status(200).json({
      success: true,
      user: user,
      token: token,
    });
  } else {
    return res.status(401).json({
      success: false,
      error: "Not authenticated",
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
    } else {
      req.logout((error) => {
        if (error) {
          console.error("Error during logout:", error);
          res.status(500).send("Internal Server Error");
        } else {
          res.redirect(`${PROD_CLIENT_URL}/login`);
        }
      });
    }
  });
});
// Google login route
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    session: true,
    failureRedirect: `${PROD_CLIENT_URL}/login?error=Google login failed`,
  })
);

// Google registration route
router.get(
  "/google/register",
  passport.authenticate("google-register", {
    scope: ["email", "profile"],
    session: true,
  })
);

// Google registration callback
router.get(
  "/google/register/callback",
  passport.authenticate("google-register", {
    failureRedirect: `${PROD_CLIENT_URL}/register?error=Google registration failed`,
    session: true,
  }),
  (req, res) => {
    // Successful registration, redirect to success page
    res.redirect(`${PROD_CLIENT_URL}/login/success`);
  }
);

// Google login callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${PROD_CLIENT_URL}/login?error=Google login failed`,
    session: true,
  }),
  (req, res) => {
    // Successful login, redirect to success page
    res.redirect(`${PROD_CLIENT_URL}/login/success`);
  }
);

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login/failed" }),
//   (req, res) => {
//     // Here req.user is set
//     const user = req.user as User;
//     const token = jwtUtil.createToken(user._id, "2d");
//     res.json({ user, token });
//   }
// );

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/recover-account", recoverAccount);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", isAuthenticated, resetPassword);

module.exports = router;
