import { Router, Request, Response } from "express";
import auth from "../middlewares/auth";

const router = Router();

router.post(
	"/:username/uploadProfilePicture",
	auth,
	(req: Request, res: Response) => res.send("Profile picture uploaded"),
);

export default router;
