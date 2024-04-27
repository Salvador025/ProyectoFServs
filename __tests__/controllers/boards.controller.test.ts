import { Response } from "express";
import { Readable } from "stream";

import Roles from "../../src/types/roles";
import board from "../../src/models/boards";
import setUpLogs from "../../src/utils/logs";
import { RequestUser } from "../../src/types";
import ResponseStatus from "../../src/types/response-codes";
import boardController from "../../src/controllers/boards.controller";
setUpLogs();

jest.mock("../../src/models/boards", () => ({
	create: jest.fn().mockResolvedValue(Promise.resolve("Board created")),
	find: jest.fn().mockResolvedValue(
		Promise.resolve([
			{
				name: "board",
				owner: "testUser",
				direction: "/path/to/board.jpg",
			},
		]),
	),
	findOne: jest.fn().mockResolvedValue(
		Promise.resolve({
			name: "board",
			owner: "testUser",
			direction: "/path/to/board.jpg",
		}),
	),
	updateOne: jest.fn().mockResolvedValue(Promise.resolve("")),
	deleteOne: jest.fn().mockResolvedValue(Promise.resolve("")),
}));

describe("UsersController", () => {
	describe("createBoard", () => {
		let req: Partial<RequestUser & { file: { location: string } }>;
		let res: Partial<Response>;

		beforeEach(() => {
			req = {
				user: {
					name: "TestUser",
					username: "testUser",
					email: "test@example.com",
					role: Roles.CREATOR,
				},
				file: {
					fieldname: "",
					originalname: "board.jpg",
					encoding: "",
					mimetype: "",
					size: 0,
					destination: "",
					filename: "",
					path: "",
					buffer: Buffer.from([]),
					location: "/path/to/board.jpg",
					stream: new Readable(),
				},
			};
			res = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn().mockReturnThis(),
				json: jest.fn().mockReturnThis(),
			};
		});
		test("should create a new board", async () => {
			await boardController.createBoard(
				req as RequestUser & { file: { location: string } },
				res as Response,
			);

			expect(res.status).toHaveBeenCalledWith(ResponseStatus.CREATED);
			expect(res.json).toHaveBeenCalledWith("Board created");
			expect(board.create).toHaveBeenCalledWith({
				name: "board",
				owner: "testUser",
				direction: "/path/to/board.jpg",
			});
		});

		test("should handle duplicate board creation", async () => {
			(board.create as jest.Mock).mockRejectedValueOnce({ code: 11000 });

			try {
				await boardController.createBoard(
					req as RequestUser & { file: { location: string } },
					res as Response,
				);
			} catch (error) {
				expect(res.status).toHaveBeenCalledWith(ResponseStatus.BAD_REQUEST);
				expect(res.send).toHaveBeenCalledWith("Board already exists");
			}
		});

		test("should handle invalid data", async () => {
			(board.create as jest.Mock).mockRejectedValueOnce({
				name: "ValidationError",
			});

			try {
				await boardController.createBoard(
					req as RequestUser & { file: { location: string } },
					res as Response,
				);
			} catch (error) {
				expect(res.status).toHaveBeenCalledWith(ResponseStatus.BAD_REQUEST);
				expect(res.send).toHaveBeenCalledWith("Invalid data");
			}
		});

		test("should handle internal server error", async () => {
			(board.create as jest.Mock).mockRejectedValueOnce(
				new Error("Generic error"),
			);
			try {
				await boardController.createBoard(
					req as RequestUser & { file: { location: string } },
					res as Response,
				);
			} catch (error) {
				expect(res.status).toHaveBeenCalledWith(
					ResponseStatus.INTERNAL_SERVER_ERROR,
				);
				expect(res.send).toHaveBeenCalledWith("Error creating board");
			}
		});
	});

	describe("getBoards", () => {
		let req: Partial<RequestUser>;
		let res: Partial<Response>;

		beforeEach(() => {
			req = {
				user: {
					name: "TestUser",
					username: "testUser",
					email: "test@example.com",
					role: Roles.CREATOR,
				},
			};
			res = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn().mockReturnThis(),
				json: jest.fn().mockReturnThis(),
			};
		});

		test("should get all boards", async () => {
			await boardController.getBoards(req as RequestUser, res as Response);

			expect(res.status).toHaveBeenCalledWith(ResponseStatus.SUCCESS);
			expect(res.json).toHaveBeenCalledWith([
				{
					name: "board",
					owner: "testUser",
					direction: "/path/to/board.jpg",
				},
			]);
			expect(board.find).toHaveBeenCalled();
		});

		test("should handle no boards found", async () => {
			(board.find as jest.Mock).mockResolvedValueOnce(null);

			try {
				await boardController.getBoards(req as RequestUser, res as Response);
			} catch (error) {
				expect(res.status).toHaveBeenCalledWith(ResponseStatus.NOT_FOUND);
				expect(res.send).toHaveBeenCalledWith("No boards found");
			}
		});

		test("should handle no boards found", async () => {
			(board.find as jest.Mock).mockResolvedValueOnce([]);

			try {
				await boardController.getBoards(req as RequestUser, res as Response);
			} catch (error) {
				expect(res.status).toHaveBeenCalledWith(ResponseStatus.NOT_FOUND);
				expect(res.send).toHaveBeenCalledWith("No boards found");
			}
		});

		test("should handle internal server error", async () => {
			(board.find as jest.Mock).mockRejectedValueOnce(
				new Error("Generic error"),
			);

			try {
				await boardController.getBoards(req as RequestUser, res as Response);
			} catch (error) {
				expect(res.status).toHaveBeenCalledWith(
					ResponseStatus.INTERNAL_SERVER_ERROR,
				);
				expect(res.send).toHaveBeenCalledWith("Error fetching boards");
			}
		});
	});

	describe("getBoardsUser", () => {
		let req: Partial<RequestUser>;
		let res: Partial<Response>;

		beforeEach(() => {
			req = {
				user: {
					name: "TestUser",
					username: "testUser",
					email: "test@example.com",
					role: Roles.CREATOR,
				},
				params: {
					username: "testUser",
				},
			};
			res = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn().mockReturnThis(),
				json: jest.fn().mockReturnThis(),
			};
		});
		test("should get all boards of a user", async () => {
			await boardController.getBoardsUser(req as RequestUser, res as Response);

			expect(res.status).toHaveBeenCalledWith(ResponseStatus.SUCCESS);
			expect(res.json).toHaveBeenCalledWith([
				{
					name: "board",
					owner: "testUser",
					direction: "/path/to/board.jpg",
				},
			]);
			expect(board.find).toHaveBeenCalledWith({ owner: "testUser" });
		});

		test("should handle no boards found", async () => {
			(board.find as jest.Mock).mockResolvedValueOnce(null);

			try {
				await boardController.getBoardsUser(
					req as RequestUser,
					res as Response,
				);
			} catch (error) {
				expect(res.status).toHaveBeenCalledWith(ResponseStatus.NOT_FOUND);
				expect(res.send).toHaveBeenCalledWith("User don't have boards");
			}
		});

		test("should handle no boards found", async () => {
			(board.find as jest.Mock).mockResolvedValueOnce([]);

			try {
				await boardController.getBoardsUser(
					req as RequestUser,
					res as Response,
				);
			} catch (error) {
				expect(res.status).toHaveBeenCalledWith(ResponseStatus.NOT_FOUND);
				expect(res.send).toHaveBeenCalledWith("User don't have boards");
			}
		});

		test("should handle internal server error", async () => {
			(board.find as jest.Mock).mockRejectedValueOnce(
				new Error("Generic error"),
			);

			try {
				await boardController.getBoardsUser(
					req as RequestUser,
					res as Response,
				);
			} catch (error) {
				expect(res.status).toHaveBeenCalledWith(
					ResponseStatus.INTERNAL_SERVER_ERROR,
				);
				expect(res.send).toHaveBeenCalledWith("Error fetching boards");
			}
		});
	});

	describe("getBoard", () => {
		let req: Partial<RequestUser>;
		let res: Partial<Response>;

		beforeEach(() => {
			req = {
				user: {
					name: "TestUser",
					username: "testUser",
					email: "test@example.com",
					role: Roles.CREATOR,
				},
				params: {
					name: "board",
				},
			};
			res = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn().mockReturnThis(),
				json: jest.fn().mockReturnThis(),
			};
		});

		test("should get a board", async () => {
			await boardController.getBoard(req as RequestUser, res as Response);

			expect(res.status).toHaveBeenCalledWith(ResponseStatus.SUCCESS);
			expect(res.json).toHaveBeenCalledWith({
				name: "board",
				owner: "testUser",
				direction: "/path/to/board.jpg",
			});
			expect(board.findOne).toHaveBeenCalledWith({ name: "board" });
		});

		test("should handle no board found", async () => {
			(board.findOne as jest.Mock).mockResolvedValueOnce(null);

			try {
				await boardController.getBoard(req as RequestUser, res as Response);
			} catch (error) {
				expect(res.status).toHaveBeenCalledWith(ResponseStatus.NOT_FOUND);
				expect(res.send).toHaveBeenCalledWith("Board not found");
			}
		});

		test("should handle internal server error", async () => {
			(board.findOne as jest.Mock).mockRejectedValueOnce(
				new Error("Generic error"),
			);

			try {
				await boardController.getBoard(req as RequestUser, res as Response);
			} catch (error) {
				expect(res.status).toHaveBeenCalledWith(
					ResponseStatus.INTERNAL_SERVER_ERROR,
				);
				expect(res.send).toHaveBeenCalledWith("Error fetching board");
			}
		});
	});

	describe("updateBoard", () => {
		let req: Partial<RequestUser & { file: { location: string } }>;
		let res: Partial<Response>;

		beforeEach(() => {
			req = {
				user: {
					name: "TestUser",
					username: "testUser",
					email: "test@example.com",
					role: Roles.CREATOR,
				},
				params: {
					name: "board",
				},
				file: {
					fieldname: "",
					originalname: "New_board.jpg",
					encoding: "",
					mimetype: "",
					size: 0,
					destination: "",
					filename: "",
					path: "",
					buffer: Buffer.from([]),
					location: "/path/to/New_board.jpg",
					stream: new Readable(),
				},
			};
			res = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn().mockReturnThis(),
				json: jest.fn().mockReturnThis(),
			};
		});

		test("should update a board", async () => {
			await boardController.updateBoard(
				req as RequestUser & { file: { location: string } },
				res as Response,
			);
			console.log("board");
			debugger;
			expect(board.findOne).toHaveBeenCalledWith({ name: "board" });
			expect(board.updateOne).toHaveBeenCalledWith(
				{ name: "board" },
				{
					name: "board",
					owner: "testUser",
					direction: "/path/to/board.jpg",
				},
			);
			expect(res.status).toHaveBeenCalledWith(ResponseStatus.SUCCESS);
			expect(res.send).toHaveBeenCalledWith("Board updated");
		});

		test("should handle no board found", async () => {
			(board.findOne as jest.Mock).mockResolvedValueOnce(null);

			try {
				await boardController.updateBoard(
					req as RequestUser & { file: { location: string } },
					res as Response,
				);
			} catch (error) {
				expect(res.status).toHaveBeenCalledWith(ResponseStatus.NOT_FOUND);
				expect(res.send).toHaveBeenCalledWith("Board not found");
			}
		});

		test("should handle not owner of the board", async () => {
			(board.findOne as jest.Mock).mockResolvedValueOnce({
				name: "board",
				owner: "anotherUser",
				direction: "/path/to/board.jpg",
			});

			try {
				await boardController.updateBoard(
					req as RequestUser & { file: { location: string } },
					res as Response,
				);
			} catch (error) {
				expect(res.status).toHaveBeenCalledWith(ResponseStatus.FORBIDDEN);
				expect(res.send).toHaveBeenCalledWith("Not owner of the board");
			}
		});

		test("should handle internal server error", async () => {
			(board.findOne as jest.Mock).mockRejectedValueOnce(
				new Error("Generic error"),
			);

			try {
				await boardController.updateBoard(
					req as RequestUser & { file: { location: string } },
					res as Response,
				);
			} catch (error) {
				expect(res.status).toHaveBeenCalledWith(
					ResponseStatus.INTERNAL_SERVER_ERROR,
				);
				expect(res.send).toHaveBeenCalledWith("Error updating board");
			}
		});
	});
});
