import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { URL } from "../url/URL";
import dotenv from "dotenv";
const User = require("../models/userModel");

dotenv.config();

// Serialize user into the sessions
const serializeUser = (): void => {
  passport.serializeUser((user: any, done) => {
    done(null, { id: user._id });
  });
};

// Deserialize user from the sessions
const deserializeUser = (): void => {
  passport.deserializeUser(async (userData: { id: string }, done) => {
    try {
      const user = await User.findById(userData.id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });
};

// Configure Google Strategy
const configureGoogleStrategy = (): void => {
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        callbackURL: `${URL.prodURL}/auth/google/callback`,
        scope: ["profile", "email"],
        passReqToCallback: false,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          if (!profile.emails || !profile.emails[0]) {
            return done(new Error("No email found in Google profile"));
          }

          const email = profile.emails[0].value;
          
          // Try to find user by googleId first
          let user = await User.findOne({ googleId: profile.id });
          
          // If not found by googleId, try by email
          if (!user) {
            user = await User.findOne({ email });
          }

          if (user) {
            // Update googleId if not set or different
            if (!user.googleId || user.googleId !== profile.id) {
              user.googleId = profile.id;
              await user.save();
            }
            return done(null, user);
          }
          
          // User doesn't exist, redirect to registration
          return done(null, false, { message: "User not registered. Please sign up first." });
        } catch (error) {
          console.error("Google Strategy Error:", error);
          return done(error);
        }
      }
    )
  );
};

// Configure Google Registration Strategy
const configureGoogleRegistrationStrategy = (): void => {
  passport.use(
    "google-register",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        callbackURL: `${URL.prodURL}/auth/google/register/callback`,
        passReqToCallback: true,
      },
      async (req: any, accessToken: string, refreshToken: string, profile: any, done: any) => {
        try {
          // Check if user already exists
          const existingUser = await User.findOne({
            email: profile.emails?.[0]?.value,
          });

          if (existingUser) {
            return done(null, false, {
              message: "An account with this email already exists. Please log in instead.",
            });
          }

          // Create new user
          const newUser = new User({
            user_name: profile.displayName,
            email: profile.emails?.[0]?.value,
            googleId: profile.id,
            // Add any other required fields
          });

          await newUser.save();
          return done(null, newUser);
        } catch (error) {
          console.error("Google registration error:", error);
          return done(error);
        }
      }
    )
  );
};

// Initialize passport
const initializePassport = (): void => {
  serializeUser();
  deserializeUser();
  configureGoogleStrategy();
  configureGoogleRegistrationStrategy();
};

export default initializePassport;
