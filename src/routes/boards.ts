import { Router, Request, Response } from "express";
import roles from "../middlewares/roles";
import Roles from "../types/roles";

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

router.get("/:username", (req: Request, res: Response) => {
	res.send(`User ${req.params.username} boards`);
});

router.post(
	"/:username",
	roles(Roles.Creator, Roles.Admin),
	(req: Request, res: Response) => {
		res.send("Board created");
	},
);

router.get("/:username/:id", (req: Request, res: Response) => {
	res.send(`Board ${req.params.id}`);
});

router.put(
	"/:username/:id",
	roles(Roles.Creator, Roles.Admin),
	(req: Request, res: Response) => {
		res.send(`Board ${req.params.id} updated`);
	},
);

router.delete(
	"/:username/:id",
	roles(Roles.Creator, Roles.Admin),
	(req: Request, res: Response) => {
		res.send(`Board ${req.params.id} deleted`);
	},
);

export default router;
