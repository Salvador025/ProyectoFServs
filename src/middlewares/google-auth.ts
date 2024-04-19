import passport from "passport";
import { Express } from "express";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import googleController from "../controllers/google.controller";

export const googleAuth = (app: Express) => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_ID,
				clientSecret: process.env.GOOGLE_SECRET,
				callbackURL: process.env.GOOGLE_CALLBACK_URL,
			},
			(accessToken, refreshToken, profile, cb) => {
				googleController.createUser(profile).then((token) => {
					const user = { ...profile, token };
					cb(null, user);
				});
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
