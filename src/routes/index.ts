import { Router, Request, Response } from "express";
import usersRoutes from "./users";
const router = Router();

router.use("/users", usersRoutes);

router.get("/", (req: Request, res: Response) => {
	res.send("Index routes works!");
});

export default router;
