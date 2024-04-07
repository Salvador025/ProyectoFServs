import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
	res.send("Marketplace routes works!");
});

router.get("/:id", (req: Request, res: Response) => {
	res.send(`Marketplace route for board ${req.params.id}`);
});

//route to download a board
router.get("/:id/download", (req: Request, res: Response) => {
	res.send(`Marketplace route to download board ${req.params.id}`);
});

export default router;
