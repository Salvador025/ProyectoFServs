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

/**
 * @swagger
 * /settings/updateRole:
 *  put:
 *   summary: Update user role
 *   tags: [Settings]
 *   description: Update user role
 *   parameters:
 *    - in: path
 *      name: username
 *      required: true
 *      description: The username of the user
 *      schema:
 *       type: string
 *    - in: path
 *      name: role
 *      required: true
 *      description: The role of the user
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Role updated
 */

router.put("/updateRole", usersController.changeRole);

/**
 * @swagger
 * /profile:
 *  put:
 *   summary: Update profile
 *   tags: [Settings]
 *   description: Update profile
 *   responses:
 *    200:
 *     description: Profile updated
 */

router.put("/profile", usersController.updateProfile);

/**
 * @swagger
 * /profile:
 *  delete:
 *   summary: Delete profile
 *   tags: [Settings]
 *   description: Delete profile
 *   responses:
 *    200:
 *     description: Profile deleted
 */
router.delete("/profile", usersController.deleteProfile);

export default router;
