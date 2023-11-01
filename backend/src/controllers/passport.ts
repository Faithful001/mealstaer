import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import jwt from "jsonwebtoken";
const User = require("../models/userModel");
import dotenv from "dotenv";

dotenv.config();

const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.JWT_SEC, { expiresIn: "2d" });
};

// JWT configuration
// const jwtOptions = {
// 	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// 	secretOrKey: process.env.JWT_SEC,
// };

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:4000/api/auth/google/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			console.log(profile);
			try {
				const exists = await User.findOne({ email: profile?.emails[0]?.value });
				if (exists) {
					// Generate a JWT token
					const token = createToken(exists._id);
					done(null, { user: exists, token });
				} else {
					const user = new User({
						user_name: profile.displayName,
						email: profile?.emails[0]?.value,
						password: null,
					});

					// Save the user to your database
					await user.save();
					// Generate a JWT token
					const token = createToken(user._id);

					done(null, { user, token });
				}
			} catch (error) {
				done(error, null);
			}
		}
	)
);

// const user = await User.findById()

// passport.use(
// 	new JwtStrategy(jwtOptions, (token, done) => {
// 		User.findById(user._id, (err, user) => {
// 			if (err) {
// 				return done(err, false);
// 			}
// 			if (user) {
// 				return done(null, user);
// 			} else {
// 				return done(null, false);
// 			}
// 		});
// 	})
// );

var opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SEC,
};

passport.use(
	new JwtStrategy(opts, function (jwt_payload, done) {
		User.findOne({ id: jwt_payload.sub }, function (err, user) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
				// or you could create a new account
			}
		});
	})
);
