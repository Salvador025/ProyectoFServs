import { Response } from "express";
import boards from "../models/boards";
import { Boards, RequestUser } from "../types";
import ResponseStatus from "../types/response-codes";
import ForbiddenError from "../utils/ForbiddenError";
import NotFoundError from "../utils/NotFoundError";

class BoardsController {
	createBoard(
		req: RequestUser & { file: { location: string } },
		res: Response,
	) {
		const data: Boards = {
			name: req.body.name,
			owner: req.user.username,
			direction: req.file.location,
			description: req.body.description,
		};
		return boards
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
					.send("Error creating board");
				consoleError(err);
			});
	}

	getBoards(req: RequestUser, res: Response) {
		return boards
			.find()
			.then((boards) => {
				if (!boards) {
					throw new NotFoundError("No boards found");
				}
				if (boards.length === 0) {
					throw new NotFoundError("No boards found");
				}
				const boardsData = boards.map((board) => {
					return {
						name: board.name,
						owner: board.owner,
						direction: board.direction,
						description: board.description,
					};
				});
				res.status(ResponseStatus.SUCCESS).json(boardsData);
			})
			.catch((err) => {
				if (err instanceof NotFoundError) {
					res.status(ResponseStatus.NOT_FOUND).send(err.message);
					return;
				}
				res
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send("Error fetching boards");
				consoleError(err);
			});
	}

	getBoardsUser(req: RequestUser, res: Response) {
		const username = req.params.username;
		return boards
			.find({ owner: username })
			.then((boards) => {
				if (!boards) {
					throw new NotFoundError("User don't have boards");
				}
				if (boards.length === 0) {
					throw new NotFoundError("User don't have boards");
				}
				const boardsData = boards.map((board) => {
					return {
						name: board.name,
						owner: board.owner,
						direction: board.direction,
						description: board.description,
					};
				});
				res.status(ResponseStatus.SUCCESS).json(boardsData);
			})
			.catch((err) => {
				if (err instanceof NotFoundError) {
					res.status(ResponseStatus.NOT_FOUND).send(err.message);
					return;
				}
				res
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send("Error fetching boards");
				consoleError(err);
			});
	}

	getBoard(req: RequestUser, res: Response) {
		const name = req.params.name;
		return boards
			.findOne({ name })
			.then((board) => {
				if (!board) {
					throw new NotFoundError("Board not found");
				}
				const boardData = {
					name: board.name,
					owner: board.owner,
					direction: board.direction,
					description: board.description,
				};
				res.status(ResponseStatus.SUCCESS).json(boardData);
			})
			.catch((err) => {
				if (err instanceof NotFoundError) {
					res.status(ResponseStatus.NOT_FOUND).send(err.message);
					return;
				}
				res
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send("Error fetching boards");
				consoleError(err);
			});
	}

	updateBoard(
		req: RequestUser & { file: { location: string } },
		res: Response,
	) {
		const name = req.params.name;
		const data: Boards = {
			name: req.body.name,
			owner: req.user.username,
			direction: req.file?.location,
			description: req.body.description,
		};
		return boards
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
			.then(async () => {
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
				consoleError(err);
				res
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send("Error updating board");
			});
	}

	deleteBoard(req: RequestUser, res: Response) {
		const name = req.params.name;
		return boards
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
				consoleError(err);
				res
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send("Error deleting board");
			});
	}
}

export default new BoardsController();
