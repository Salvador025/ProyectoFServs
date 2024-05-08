import { Router } from "express";
import passport from "passport";
import googleController from "../controllers/google.controller";
const router = Router();

/**
 * @swagger
 * tags:
 *  name: Google
 *  description: Google authentication
 */

router.get(
	"/",
	passport.authenticate("google", { scope: ["profile", "email"] }),
);

/**
 * @swagger
 * /auth/google/callback:
 * get:
 * summary: Google callback
 * tags: [Google]
 * description: Google callback
 * 	security:
 * 		- bearerAuth: []
 * responses:
 * 	"200":
 * 		description: Google callback
 * 		content:
 * 			application/json:
 * 				schema:
 * 					type: object
 * 					properties:
 * 						message:
 * 							type: string
 * 							example: Google callback
 * 	"401":
 */
router.get(
	"/callback",
	passport.authenticate("google", { failureRedirect: "/auth/login" }),
	googleController.googleCallback,
);

export default router;
