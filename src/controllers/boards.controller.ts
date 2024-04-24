import { Response } from "express";
import boards from "../models/boards";
import { RequestUser, Boards } from "../types";
import ResponseStatus from "../types/response-codes";
import NotFoundError from "../utils/NotFoundError";
import ForbiddenError from "../utils/ForbiddenError";

class BoardsController {
	createBoard(
		req: RequestUser & { file: { location: string } },
		res: Response,
	) {
		const data: Boards = {
			name: req.file.originalname.replace(/\.[^/.]+$/, ""),
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

	getBoards(req: RequestUser, res: Response) {
		boards
			.find()
			.then((boards) => {
				if (!boards) {
					throw new NotFoundError("No boards found");
				}
				if (boards.length === 0) {
					throw new NotFoundError("No boards found");
				}
				res.status(ResponseStatus.SUCCESS).json(boards);
			})
			.catch((err) => {
				if (err instanceof NotFoundError) {
					res.status(ResponseStatus.NOT_FOUND).send(err.message);
					return;
				}
				res
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.json("Error fetching boards");
				console.error(err);
			});
	}

	getBoardsUser(req: RequestUser, res: Response) {
		const username = req.params.username;
		boards
			.find({ owner: username })
			.then((boards) => {
				if (!boards) {
					throw new NotFoundError("User don't have boards");
				}
				if (boards.length === 0) {
					throw new NotFoundError("User don't have boards");
				}
				res.status(ResponseStatus.SUCCESS).json(boards);
			})
			.catch((err) => {
				if (err instanceof NotFoundError) {
					res.status(ResponseStatus.NOT_FOUND).send(err.message);
					return;
				}
				res
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.json("Error fetching boards");
				console.error(err);
			});
	}

	getBoard(req: RequestUser, res: Response) {
		const name = req.params.name;
		boards
			.findOne({ name })
			.then((board) => {
				if (!board) {
					throw new NotFoundError("Board not found");
				}
				res.status(ResponseStatus.SUCCESS).json(board);
			})
			.catch((err) => {
				if (err instanceof NotFoundError) {
					res.status(ResponseStatus.NOT_FOUND).send(err.message);
					return;
				}
				res
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.json("Error fetching boards");
				console.error(err);
			});
	}

	updateBoard(
		req: RequestUser & { file: { location: string } },
		res: Response,
	) {
		const name = req.params.name;
		const data: Boards = {
			name: req.file.originalname.replace(/\.[^/.]+$/, ""),
			owner: req.user.username,
			direction: req.file.location,
		};
		boards
			.findOne({ name })
			.then((board) => {
				if (!board) {
					throw new NotFoundError("Board not found");
				}
				if (board.owner !== req.user.username) {
					throw new ForbiddenError("Not owner of the board");
				}
				return boards.updateOne({ name }, data);
			})
			.then(() => {
				res.status(ResponseStatus.SUCCESS).send("Board updated");
			})
			.catch((err) => {
				if (err instanceof NotFoundError) {
					res.status(ResponseStatus.NOT_FOUND).send(err.message);
					return;
				}
				if (err instanceof ForbiddenError) {
					res.status(ResponseStatus.FORBIDDEN).send(err.message);
					return;
				}
				console.error(err);
				res
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send("Error updating board");
			});
	}

	deleteBoard(req: RequestUser, res: Response) {
		const name = req.params.name;
		boards
			.findOne({ name })
			.then((board) => {
				if (!board) {
					throw new NotFoundError("Board not found");
				}
				if (board.owner !== req.user.username) {
					throw new ForbiddenError("Not owner of the board");
				}
				return boards.deleteOne({ name });
			})
			.then(() => {
				res.status(ResponseStatus.SUCCESS).send("Board deleted");
			})
			.catch((err) => {
				if (err instanceof NotFoundError) {
					res.status(ResponseStatus.NOT_FOUND).send(err.message);
					return;
				}
				if (err instanceof ForbiddenError) {
					res.status(ResponseStatus.FORBIDDEN).send(err.message);
					return;
				}
				console.error(err);
				res
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send("Error deleting board");
			});
	}
}

export default new BoardsController();
