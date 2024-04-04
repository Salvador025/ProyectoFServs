import { Request, Response } from "express";

import UsersController from "../../src/controllers/users.controller";
import user from "../../src/models/user";
import ResponseStatus from "../../src/types/response-codes";
import { code as createToken } from "../../src/utils/create-token";

// Mock the external dependencies
jest.mock("../../src/models/user", () => ({
	create: jest.fn().mockResolvedValue(Promise.resolve("User created")),
	findOne: jest.fn().mockResolvedValue(
		Promise.resolve({
			name: "TestUser",
			password: "password123", // pragma: allowlist secret
			email: "test@example.com",
		}),
	),
}));

jest.mock("../../src/utils/hash-password", () =>
	jest.fn().mockReturnValue("hashed_password"),
);

jest.mock("../../src/utils/create-token", () => ({
	code: jest.fn().mockReturnValue("token"),
}));

describe("UsersController", () => {
	let req: Partial<Request>;
	let res: Partial<Response>;

	// Mock the Express req and res objects before each test
	beforeEach(() => {
		req = {
			body: {
				name: "TestUser",
				password: "password123", // pragma: allowlist secret
				email: "test@example.com",
			},
		};

		res = {
			status: jest.fn().mockReturnThis(),
			send: jest.fn().mockReturnThis(),
		};
	});

	describe("signUp", () => {
		it("should create a new user and send a CREATED response", async () => {
			// Arrange
			// Cast the req object to the correct type
			await UsersController.signUp(req as Request, res as Response);

			// Assert
			expect(user.create).toHaveBeenCalledWith({
				name: "TestUser",
				password: "hashed_password", // pragma: allowlist secret
				email: "test@example.com",
			});
			expect(res.status).toHaveBeenCalledWith(ResponseStatus.CREATED);
			expect(res.send).toHaveBeenCalledWith("User created");
		});

		/* 	it("should handle 'email already exists' error", async () => {
			// Arrange

			const createMock = user.create as jest.Mock;
			createMock.mockRejectedValueOnce({ code: 11000 });

			// Act
			await UsersController.signUp(req as Request, res as Response);

			// Assert
			expect(res.status).toHaveBeenCalledWith(ResponseStatus.BAD_REQUEST);
			expect(res.send).toHaveBeenCalledWith("Email already exists");
		}); */

		/* it("should handle validation errors", async () => {
			// Arrange

			const createMock = user.create as jest.Mock;
			const validationError = new Error("Validation error");
			validationError.name = "ValidationError";
			createMock.mockRejectedValueOnce(validationError);

			// Act
			await UsersController.signUp(req as Request, res as Response);

			// Assert
			expect(res.status).toHaveBeenCalledWith(ResponseStatus.BAD_REQUEST);
			expect(res.send).toHaveBeenCalledWith("Invalid data");
		});

		it("should handle generic errors", async () => {
			// Arrange

			const createMock = user.create as jest.Mock;
			createMock.mockRejectedValueOnce(new Error("Generic error"));

			// Act
			await UsersController.signUp(req as Request, res as Response);

			// Assert
			expect(res.status).toHaveBeenCalledWith(ResponseStatus.BAD_REQUEST);
			expect(res.send).toHaveBeenCalledWith("Something went wrong");
		}); */
	});

	describe("logIn", () => {
		it("should log in an existing user and send back a token", async () => {
			// Arrange
			(user.findOne as jest.Mock).mockResolvedValue({
				name: "TestUser",
				email: "test@example.com",
			});

			// Act
			await UsersController.logIn(req as Request, res as Response);

			// Assert
			expect(user.findOne).toHaveBeenCalledWith({
				email: "test@example.com",
				password: "hashed_password", // pragma: allowlist secret
			});
			expect(createToken).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(ResponseStatus.SUCCESS);
			expect(res.send).toHaveBeenCalledWith({ token: "token" });
		});
	});
});
