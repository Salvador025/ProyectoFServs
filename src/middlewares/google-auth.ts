import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import { Express } from "express";

export const googleAuth = (app: Express) => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_ID,
				clientSecret: process.env.GOOGLE_SECRET,
				callbackURL: process.env.GOOGLE_CALLBACK_URL,
			},
			(accessToken, refreshToken, profile, cb) => {
				console.log("User profile:", profile);
				return cb(null, profile);
			},
		),
	);

	passport.serializeUser((user, cb) => {
		cb(null, user);
	});

	passport.deserializeUser((user, cb) => {
		cb(null, user);
	});

	app.use(
		session({
			resave: false,
			saveUninitialized: true,
			secret: process.env.SECRET_KEY,
		}),
	);

	app.use(passport.initialize());
	app.use(passport.session());
};
