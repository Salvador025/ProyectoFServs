import { Router, Request, Response } from "express";

//const router = express.Router();

const router = Router();

router.get("/", (req: Request, res: Response) => {
	res.send("Index routes works!");
});

export default router;
