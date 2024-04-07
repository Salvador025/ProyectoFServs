import { Router, Request, Response } from "express";

const router = Router();

//swagger for index board
/**
 * @swagger
 * /:
 *  get:
 *   summary: Index route
 *   tags: [Index]
 *   description: Index route
 */

router.get("/", (req: Request, res: Response) => {
	res.send("Index routes works!!!!");
});

//swagger for upload board
/**
 * @swagger
 * /upload:
 *  post:
 *   summary: Upload board
 *   tags: [Index]
 *   description: Upload board
 */
router.post("/upload", (req: Request, res: Response) => {
	res.send("Endpoint para subir archivos!!!!");
});

//swagger for update board
/**
 * @swagger
 * /upload:
 *  put:
 *   summary: Update board
 *   tags: [Index]
 *   description: Update board
 */
router.put("/upload", (req: Request, res: Response) => {
	res.send("Endpoint para subir archivos!!!!");
});

//swagger for delete board
/**
 * @swagger
 * /upload:
 *  delete:
 *   summary: Delete board
 *   tags: [Index]
 *   description: Delete board
 */
router.delete("/upload", (req: Request, res: Response) => {
	res.send("Endpoint para subir archivos!!!!");
});

export default router;
