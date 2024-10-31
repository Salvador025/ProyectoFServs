import { Request, Response, Router } from "express";
const router = Router();

/**
 * @swagger
 * /chat:
 *  get:
 *   summary: Chat
 *   tags: [chat]
 *   description: Chat
 */
router.get("/", (req: Request, res: Response) => {
	res.render("boards-chat", {
		layout: "chat",
	});
});

export default router;
