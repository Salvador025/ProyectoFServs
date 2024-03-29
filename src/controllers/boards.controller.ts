import { Request, Response } from "express";

class BoardsController {
	public index(req: Request, res: Response) {
		res.send("Index routes works!");
	}
}

export default new BoardsController();
