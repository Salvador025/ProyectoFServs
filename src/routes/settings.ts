import { Router, Request, Response } from "express";
import usersController from "../controllers/users.controller";
import upload from "../middlewares/upload-s3";

const router = Router();

router.get("/", (req: Request, res: Response) => {
	res.send("Settings routes works!");
});

router.get("/profile", (req: Request, res: Response) =>
	res.send("Settings page"),
);

router.post(
	"/profile/uploadProfilePicture",
	upload.single("profilePicture"),
	usersController.uploadProfilePicture,
);

export default router;
