import { Router, Request, Response } from "express";

const router = Router();

//swagger for marketplace
/**
 * @swagger
 * /marketplace:
 *  get:
 *   summary: Marketplace home
 *   tags: [Marketplace]
 *   description: Marketplace home endpoint
 */
router.get("/", (req: Request, res: Response) => {
	res.send("Marketplace routes works!");
});

//swagger to get a especific board
/**
 * @swagger
 * /get board/{id}:
 *  get:
 *   summary: Get a especific board
 *   tags: [Marketplace]
 *   description: Get a especific board
 */

//route to get a especific board

router.get("/:id", (req: Request, res: Response) => {
	res.send(`Marketplace route for board ${req.params.id}`);
});

/**
 * @swagger
 * /download/{id}:
 *  get:
 *   summary: Download a board
 *   tags: [Marketplace]
 *   description: Download a board
 */
//route to download a board
router.get("/:id/download", (req: Request, res: Response) => {
	res.send(`Marketplace route to download board ${req.params.id}`);
});

export default router;
