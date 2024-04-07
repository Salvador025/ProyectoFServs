import { Router, Request, Response } from "express";
import usersController from "../controllers/users.controller";
import upload from "../middlewares/upload-s3";

const router = Router();

/**
 * @swagger
 * /profile:
 *  get:
 *   summary: Profile page
 *   tags: [Settings]
 *   description: Profile page of the user
 *   responses:
 *    200:
 *     description: Profile page
 */
router.get("/profile", (req: Request, res: Response) =>
	res.send("Settings page"),
);

/**
 * @swagger
 * /profile/uploadProfilePicture:
 *  post:
 *   summary: Upload profile picture
 *   tags: [Settings]
 *   description: Upload profile picture
 *   parameters:
 *    - in: path
 *      name: username
 *      required: true
 *      description: The username of the user
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Profile picture uploaded
 */
router.post(
	"/profile/uploadProfilePicture",
	upload.single("profilePicture"),
	usersController.uploadProfilePicture,
);

export default router;
