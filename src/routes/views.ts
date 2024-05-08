import { Router } from "express";

const router = Router();

router.get("/home", (req, res) => {
	res.render("home", {
		layout: "main",
	});
});

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

router.get("/frontCallback/:token", (req, res) => {
	res.render("empty", {
		layout: "frontCallback",
	});
});

router.get("/createBoard", (req, res) => {
	res.render("create-data", {
		layout: "createBoard",
	});
});

export default router;
