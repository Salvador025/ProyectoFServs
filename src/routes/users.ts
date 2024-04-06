import { Router, Request, Response } from "express";
import usersController from "../controllers/users.controller";
import auth from "../middlewares/auth";

const router = Router();

router.post("/signup", usersController.signUp);
router.post("/login", usersController.logIn);

router.get("/:username", auth, (req: Request, res: Response) =>
	res.send("User details"),
);

export default router;
