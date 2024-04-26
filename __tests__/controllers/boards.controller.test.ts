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

		// Mock the Express req and res objects before each test
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
			(board.create as jest.Mock).mockRejectedValue({ code: 11000 });

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
			(board.create as jest.Mock).mockRejectedValue({
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
			(board.create as jest.Mock).mockRejectedValue(new Error("Some error"));
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
});
