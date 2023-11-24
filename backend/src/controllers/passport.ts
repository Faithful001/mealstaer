import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
const User = require("../models/userModel");
require("dotenv").config();

// interface User {
// 	_id: string;
// 	user_name: string;
// 	email: string;
// 	passowrd;
// }

passport.serializeUser((user: any, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "https://mealstaer.onrender.com/api/auth/google/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			// console.log(profile);
			try {
				const exists = await User.findOne({ email: profile?.emails[0]?.value });
				if (exists) {
					done(null, exists);
				} else {
					const user = new User({
						user_name: profile.displayName,
						email: profile?.emails[0]?.value,
						password: null,
					});

					// Save the user to your database
					await user.save();
					done(null, user);
				}
			} catch (error) {
				done(error, null);
			}
		}
	)
);

// const opts = {
// 	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// 	secretOrKey: process.env.JWT_SEC,
// };

// passport.use(
// 	new JwtStrategy(opts, function (jwt_payload, done) {
// 		User.findOne({ id: jwt_payload.sub }, function (err, user) {
// 			if (err) {
// 				return done(err, false);
// 			}
// 			if (user) {
// 				return done(null, user);
// 			} else {
// 				return done(null, false);
// 				// or you could create a new account
// 			}
// 		});
// 	})
// );
