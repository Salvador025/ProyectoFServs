import { Router, Response } from "express";
import usersController from "../controllers/users.controller";
import auth from "../middlewares/auth";

import { RequestUser } from "../types";
const router = Router();

router.post("/signup", usersController.signUp);
router.post("/login", usersController.logIn);

router.get("/:username", auth, (req: RequestUser, res: Response) =>
	res.send(req.user),
);

export default router;
