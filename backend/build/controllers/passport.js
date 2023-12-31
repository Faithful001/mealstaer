"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
// import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
const User = require("../models/userModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// interface User {
// 	_id: string;
// 	user_name: string;
// 	email: string;
// 	passowrd;
// }
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/api/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    try {
        const exists = await User.findOne({ email: profile?.emails[0]?.value });
        if (exists) {
            done(null, exists);
        }
        else {
            const user = new User({
                user_name: profile.displayName,
                email: profile?.emails[0]?.value,
                password: null,
            });
            // Save the user to your database
            await user.save();
            done(null, user);
        }
    }
    catch (error) {
        done(error, null);
    }
}));
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
//# sourceMappingURL=passport.js.map