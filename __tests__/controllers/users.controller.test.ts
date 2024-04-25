// cspell: ignore fieldname
import { Request, Response } from "express";

import UsersController from "../../src/controllers/users.controller";
import user from "../../src/models/user";
import ResponseStatus from "../../src/types/response-codes";
import { code as createToken } from "../../src/utils/create-token";
import { RequestUser, User } from "../../src/types";
import Roles from "../../src/types/roles";
import { Readable } from "stream";

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
	updateOne: jest.fn().mockResolvedValue(Promise.resolve("")),
}));

jest.mock("../../src/utils/hash-password", () =>
	jest.fn().mockReturnValue("hashed_password"),
);

jest.mock("../../src/utils/create-token", () => ({
	code: jest.fn().mockReturnValue("token"),
}));

describe("UsersController", () => {
	describe("signUp", () => {
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

		test("should create a new user and send a CREATED response", async () => {
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

		test("should handle 'email already exists' error", async () => {
			// Arrange
			(user.create as jest.Mock).mockRejectedValue({ code: 11000 });

			try {
				// Act
				await UsersController.signUp(req as Request, res as Response);
			} catch (error) {
				// Assert
				expect(res.status).toHaveBeenCalledWith(ResponseStatus.BAD_REQUEST);
				expect(res.send).toHaveBeenCalledWith("Email already exists");
			}
		});

		test("should handle validation errors", async () => {
			// Arrange
			const validationError = new Error("Validation error");
			validationError.name = "ValidationError";

			(user.create as jest.Mock).mockRejectedValue(
				new Error("Validation error"),
			);
			// const createMock = user.create as jest.Mock;
			// createMock.mockRejectedValueOnce(validationError);

			try {
				// Act
				await UsersController.signUp(req as Request, res as Response);
			} catch (error) {
				// Assert
				expect(res.status).toHaveBeenCalledWith(ResponseStatus.BAD_REQUEST);
				expect(res.send).toHaveBeenCalledWith("Invalid data");
			}
		});

		test("should handle generic errors", async () => {
			// Arrange

			const createMock = user.create as jest.Mock;
			createMock.mockRejectedValueOnce(new Error("Generic error"));

			try {
				// Act
				await UsersController.signUp(req as Request, res as Response);
			} catch (error) {
				// Assert
				expect(res.status).toHaveBeenCalledWith(
					ResponseStatus.INTERNAL_SERVER_ERROR,
				);
				expect(res.send).toHaveBeenCalledWith("Something went wrong");
			}
		});
	});

	describe("logIn", () => {
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
		test("should log in an existing user and send back a token", async () => {
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

		test("should handle invalid credentials", async () => {
			// Arrange
			(user.findOne as jest.Mock).mockResolvedValue(null);

			try {
				// Act
				await UsersController.logIn(req as Request, res as Response);
			} catch (error) {
				// Assert
				expect(res.status).toHaveBeenCalledWith(ResponseStatus.UNAUTHORIZED);
				expect(res.send).toHaveBeenCalledWith("Invalid credentials");
			}
		});

		test("should handle generic errors", async () => {
			// Arrange
			(user.findOne as jest.Mock).mockRejectedValue(new Error("Generic error"));

			// Act
			try {
				await UsersController.logIn(req as Request, res as Response);
			} catch (error) {
				// Assert
				expect(res.status).toHaveBeenCalledWith(
					ResponseStatus.INTERNAL_SERVER_ERROR,
				);
				expect(res.send).toHaveBeenCalledWith("Something went wrong");
			}
		});
	});

	describe("changeRole", () => {
		let req: Partial<RequestUser>;
		let res: Partial<Response>;

		// Mock the Express req and res objects before each test
		beforeEach(() => {
			req = {
				user: {
					name: "TestUser",
					username: "testUser",
					email: "test@example.com",
					role: Roles.USER,
				},
				body: {
					role: "admin",
				},
			};
			res = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn().mockReturnThis(),
			};
			(user.updateOne as jest.Mock).mockResolvedValue(
				Promise.resolve("Role changed"),
			);
		});
		test("should change the role of a user", async () => {
			(user.updateOne as jest.Mock).mockResolvedValue({
				name: "TestUser",
				username: "testUser",
				email: "test@example.com",
			});

			await UsersController.changeRole(req as RequestUser, res as Response);

			// Assert
			expect(res.status).toHaveBeenCalledWith(ResponseStatus.SUCCESS);
			expect(res.send).toHaveBeenCalledWith("Role changed");
		});

		test("should handle invalid role", async () => {
			// Arrange
			req.body.role = "invalid_role";

			try {
				// Act
				await UsersController.changeRole(req as RequestUser, res as Response);
			} catch (error) {
				// Assert
				expect(res.status).toHaveBeenCalledWith(ResponseStatus.BAD_REQUEST);
				expect(res.send).toHaveBeenCalledWith("Invalid role");
			}
		});

		test("should handle generic errors", async () => {
			// Arrange
			(user.updateOne as jest.Mock).mockRejectedValue(
				new Error("Generic error"),
			);
			try {
				// Act
				await UsersController.changeRole(req as RequestUser, res as Response);
			} catch (error) {
				// Assert
				expect(res.status).toHaveBeenCalledWith(ResponseStatus.BAD_REQUEST);
				expect(res.send).toHaveBeenCalledWith("Something went wrong");
			}
		});
	});

	describe("uploadProfilePicture", () => {
		let req: Partial<RequestUser & { file: { location: string } }>;
		let res: Partial<Response>;

		// Mock the Express req and res objects before each test
		beforeEach(() => {
			req = {
				user: {
					name: "TestUser",
					username: "testUser",
					email: "test@example.com",
					role: Roles.USER,
				},
				file: {
					fieldname: "",
					originalname: "",
					encoding: "",
					mimetype: "",
					size: 0,
					destination: "",
					filename: "",
					path: "",
					buffer: Buffer.from([]),
					location: "profile_picture.jpg",
					stream: new Readable(),
				},
			};
			res = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn().mockReturnThis(),
			};
			(user.updateOne as jest.Mock).mockResolvedValue(
				Promise.resolve("image Upload"),
			);
		});

		test("should upload profile picture and send a SUCCESS response", async () => {
			// Arrange
			(user.updateOne as jest.Mock).mockResolvedValue({});

			await UsersController.uploadProfilePicture(
				req as RequestUser & { file: { location: string } },
				res as Response,
			);
			// Assert
			expect((req.user as User).image).toBe("profile_picture.jpg");
			expect(user.updateOne).toHaveBeenCalledWith(
				{ email: "test@example.com" },
				{ image: "profile_picture.jpg" },
			);
			expect(res.status).toHaveBeenCalledWith(ResponseStatus.SUCCESS);
			expect(res.send).toHaveBeenCalledWith("Profile picture uploaded");
		});

		test("should handle errors and send a BAD_REQUEST response", async () => {
			// Arrange
			(user.updateOne as jest.Mock).mockRejectedValue(
				new Error("Generic error"),
			);

			try {
				// Act
				await UsersController.uploadProfilePicture(
					req as RequestUser & { file: { location: string } },
					res as Response,
				);
			} catch (error) {
				// Assert
				expect(res.status).toHaveBeenCalledWith(ResponseStatus.BAD_REQUEST);
				expect(res.send).toHaveBeenCalledWith("Something went wrong");
			}
		});
	});
});
