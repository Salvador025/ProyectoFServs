import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
	res.send("Index routes works!!!!");
});

router.post("/upload", (req: Request, res: Response) => {
	res.send("Endpoint para subir archivos!!!!");
});

router.put("/upload", (req: Request, res: Response) => {
	res.send("Endpoint para subir archivos!!!!");
});

router.delete("/upload", (req: Request, res: Response) => {
	res.send("Endpoint para subir archivos!!!!");
});

export default router;
