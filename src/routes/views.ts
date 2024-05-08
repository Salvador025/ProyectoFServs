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

router.get("/frontCallback/:token", (req, res) => {
	res.render("empty", {
		layout: "frontCallback",
	});
});

export default router;
