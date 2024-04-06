import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
	res.send("Marketplace routes works!");
});

//ruta para ir a un board em específico
router.get("/:id", (req: Request, res: Response) => {
	res.send(`Marketplace route for board ${req.params.id}`);
});

export default router;
