import { Router } from "express";
import usersController from "../controllers/users.controller";
import { uploadProfile } from "../middlewares/upload-s3";

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
router.get("/profile", usersController.getProfile);

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
router.put(
	"/profile/uploadProfilePicture",
	uploadProfile.single("profilePicture"),
	usersController.uploadProfilePicture,
);

router.put("/updateRole", usersController.changeRole);

router.put("/profile", usersController.updateProfile);

router.delete("/profile", usersController.deleteProfile);

export default router;
