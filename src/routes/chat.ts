import { Router, Request, Response } from "express";
const router = Router();

router.get("/", (req: Request, res: Response) => {
	res.render("boards-chat", {
		layout: "chat",
	});
	// res.sendFile(path.join(__dirname, "../../public/chat.html"));
});

export default router;
