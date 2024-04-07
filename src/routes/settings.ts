import { Router, Request, Response } from "express";
import auth from "../middlewares/auth";

const router = Router();

router.get("/profile", auth, (req: Request, res: Response) =>
	res.send("Settings page"),
);

router.post("/profile/uploadProfilePicture", (req: Request, res: Response) =>
	res.send("Profile picture uploaded"),
);

export default router;
