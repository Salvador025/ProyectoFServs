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

export default router;
