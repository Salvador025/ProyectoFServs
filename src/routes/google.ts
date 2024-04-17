import { Router } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import googleController from "../controllers/google.controller";
import { User } from "../types";

const router = Router();

router.use(
	session({
		secret: process.env.SECRET_KEY,
		resave: false,
		saveUninitialized: true,
	}),
);

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			callbackURL: "/auth/google/callback",
		},
		(accessToken, refreshToken, profile, cb) => {
			//validate user in out database
			googleController.createUser(profile);
			return cb(null, profile);
		},
	),
);

passport.serializeUser((user: User, done) => {
	done(null, user);
});

passport.deserializeUser((user: User, done) => {
	done(null, user);
});

router.use(passport.initialize());
router.use(passport.session());

router.get(
	"/",
	passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
	"/callback",
	passport.authenticate("google", { failureRedirect: "/auth/login" }),
	googleController.googleCallback,
);

export default router;
