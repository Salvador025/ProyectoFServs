import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Views
 *  description: Views endpoints
 */

router.get("/home", (req, res) => {
	res.render("home", {
		layout: "main",
	});
});

/*swagger documentation*/
/**
 * @swagger
 * tags:
 *  name: Views
 *  description: Views endpoints
 */

router.get("/settings", (req, res) => {
	res.render("settings", {
		layout: "main",
	});
});

/**
 * @swagger
 * /marketplace:
 *  get:
 *   summary: Marketplace home
 *   tags: [Marketplace]
 *   description: Marketplace home endpoint
 */
router.get("/marketplace", (req, res) => {
	res.render("board-list", {
		layout: "marketplace",
	});
});

/**
 * @swagger
 * /frontCallback/{token}:
 *  get:
 *   summary: Front callback
 *   tags: [Views]
 *   description: Front callback
 *   parameters:
 *    - in: path
 *      name: token
 *      required: true
 *      description: The token
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Front callback
 */

router.get("/frontCallback/:token", (req, res) => {
	res.render("empty", {
		layout: "frontCallback",
	});
});

/**
 * @swagger
 * /play:
 *  get:
 *   summary: Play
 *   tags: [Views]
 *   description: Play endpoint
 */
router.get("/play", (req, res) => {
	res.render("play", {
		layout: "main",
	});
});

/**
 * @swagger
 * /createBoard:
 *  get:
 *   summary: Create board
 *   tags: [Views]
 *   description: Create board endpoint
 */

router.get("/createBoard", (req, res) => {
	res.render("create-data", {
		layout: "createBoard",
	});
});

export default router;
