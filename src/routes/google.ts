import { Router } from "express";
import passport from "passport";
import googleController from "../controllers/google.controller";
const router = Router();

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
