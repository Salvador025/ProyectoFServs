import { Router, Request, Response } from "express";
import auth from "../middlewares/auth";

const router = Router();

//swagger for upload profile picture

/**
 * @swagger
 * /uploadProfilePicture:
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
	"/:username/uploadProfilePicture",
	auth,
	(req: Request, res: Response) => res.send("Profile picture uploaded"),
);

export default router;
