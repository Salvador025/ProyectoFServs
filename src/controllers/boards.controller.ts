import { Response } from "express";
import boards from "../models/boards";
import { RequestUser, Boards } from "../types";
import ResponseStatus from "../types/response-codes";

class BoardsController {
	createBoard(
		req: RequestUser & { file: { location: string } },
		res: Response,
	) {
		const data: Boards = {
			name: req.file.originalname,
			owner: req.user.username,
			direction: req.file.location,
		};
		boards
			.create(data)
			.then((board) => {
				res.status(ResponseStatus.CREATED).json(board);
			})
			.catch((err) => {
				if (err.code === 11000) {
					res.status(ResponseStatus.BAD_REQUEST).send("Board already exists");
					return;
				}
				if (err.name === "ValidationError") {
					res.status(ResponseStatus.BAD_REQUEST).send("Invalid data");
					return;
				}
				res
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.json("Error creating board");
				console.error(err);
			});
	}

	getBoard(req: RequestUser, res: Response) {
		boards
			.find({ owner: req.user.username })
			.then((board) => {
				res.status(ResponseStatus.SUCCESS).json(board);
			})
			.catch((err) => {
				res
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.json("Error fetching boards");
				console.error(err);
			});
	}
}

export default new BoardsController();
