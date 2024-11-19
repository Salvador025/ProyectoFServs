import { Request, Response, Router } from "express";
const router = Router();

router.get("/", (req: Request, res: Response) => {
	res.render("boards-chat", {
		layout: "chat",
	});
});

export default router;
