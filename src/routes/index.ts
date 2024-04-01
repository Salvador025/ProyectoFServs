import { Router, Request, Response } from "express";
import boardsRoutes from "./boards";
import usersRoutes from "./users";
const router = Router();

router.get("/", (req: Request, res: Response) => {
	res.send("Index routes works!");
});

router.use("/users", usersRoutes);
router.use("/boards", boardsRoutes);

export default router;
