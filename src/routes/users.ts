import { Router, Request, Response } from "express";
import usersController from "../controllers/users.controller";

const router = Router();

router.post("/signup", usersController.signUp);
router.post("/login", usersController.logIn);

router.get("/users", (req: Request, res: Response) => {
	res.send("Users route");
});

router.post("/users", (req: Request, res: Response) => {
	res.send("Users route");
});

router.put("/users", (req: Request, res: Response) => {
	res.send("Users route");
});

router.delete("/users", (req: Request, res: Response) => {
	res.send("Users route");
});

export default router;
