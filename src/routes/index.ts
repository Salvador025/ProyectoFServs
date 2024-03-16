import { Router, Request, Response } from "express";
import boardsRoutes from "./boards.routes";
//const router = express.Router();

const router = Router();

router.get("/", (req: Request, res: Response) => {
	res.send("Index routes works!");
});

router.use("/boards", boardsRoutes);

export default router;
