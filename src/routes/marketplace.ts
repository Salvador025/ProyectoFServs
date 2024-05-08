import { Router, Request, Response } from "express";

const router = Router();

//swagger for marketplace

//swagger to get a specific board
/**
 * @swagger
 * /marketplace/:username:
 *  get:
 *   summary: Get the boards of a specific user
 *   tags: [Marketplace]
 *   description: Get a specific board
 */
router.get("/", (req, res) => {
	res.render("board-list", {
		layout: "marketplace",
	});
});

//route to get a specific board
router.get("/:username", (req: Request, res: Response) => {
	res.send(`Marketplace route for board ${req.params.id}`);
});

//swagger to get a specific board
/**
 * @swagger
 * /marketplace/:username:
 *  get:
 *   summary: Get the boards of a specific user
 *   tags: [Marketplace]
 *   description: Get a specific board
 */

//route to get a specific board
router.get("/:username", (req: Request, res: Response) => {
	res.render("board-list", {
		layout: "marketplace",
	});
});

//swagger to get a specific board
/**
 * @swagger
 * /marketplace/:username/:name:
 *  get:
 *   summary: Get a specific board
 *   tags: [Marketplace]
 *   description: Get a specific board
 */

//route to get a specific board
router.get("/:username/:name", (req: Request, res: Response) => {
	res.send(`Marketplace route for board ${req.params.id}`);
});

export default router;
