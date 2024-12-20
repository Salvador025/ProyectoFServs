import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { Profile } from "passport-google-oauth20";
import googleController from "../../src/controllers/google.controller";
import userModel from "../../src/models/user";
import { User } from "../../src/types";
import { UserToken } from "../../src/types";
import Roles from "../../src/types/roles";
import { code as createToken } from "../../src/utils/create-token";
import setUpLogs from "../../src/utils/logs";
setUpLogs();

jest.mock("../../src/models/user", () => ({
	create: jest.fn().mockResolvedValue(Promise.resolve("User created")),
	findOne: jest.fn().mockResolvedValue(Promise.resolve({})),
}));

jest.mock("../../src/utils/create-token", () => ({
	code: jest.fn().mockReturnValue("token"),
}));

describe("Google Controller", () => {
	describe("createUser", () => {
		let mockUser: User;
		let mockProfile: Profile;
		beforeEach(() => {
			mockUser = {
				name: "John Doe",
				username: "john_doe",
				email: "john.doe@example.com",
				role: Roles.USER,
				image: "https://example.com/profile.jpg",
			};
			mockProfile = {
				emails: [{ value: "john.doe@example.com", verified: "true" }],
				displayName: "John Doe",
				photos: [{ value: "https://example.com/profile.jpg" }],
				profileUrl: "",
				id: "",
				_raw: "",
				_json: {
					iss: "",
					aud: "",
					sub: "",
					iat: 0,
					exp: 0,
				},
				provider: "",
			};
		});
		test("should create a new user if not found in the database", async () => {
			(userModel.findOne as jest.Mock).mockResolvedValue(null);

			const result = await googleController.createUser(mockProfile);

			expect(userModel.findOne).toHaveBeenCalledWith({
				email: "john.doe@example.com",
			});
			expect(userModel.create).toHaveBeenCalledWith(mockUser);
			expect(createToken).toHaveBeenCalled();
			expect(result).toBe("token");
		});

		test("should resolve with existing user if found in the database", async () => {
			(userModel.findOne as jest.Mock).mockResolvedValue(mockUser);

			const result = await googleController.createUser(mockProfile);

			expect(userModel.findOne).toHaveBeenCalledWith({
				email: "john.doe@example.com",
			});
			expect(createToken).toHaveBeenCalled();
			expect(result).toBe("token");
		});

		test("should reject with an error if an error occurs", async () => {
			(userModel.findOne as jest.Mock).mockRejectedValue(
				new Error("Generic error"),
			);

			try {
				await googleController.createUser(mockProfile);
			} catch (error) {
				expect(userModel.findOne).toHaveBeenCalledWith({
					email: "john.doe@example.com",
				});
				expect(userModel.create).not.toHaveBeenCalled();
			}
		});
	});

	describe("googleCallback", () => {
		test("should send the user token in the response", () => {
			const req = {
				user: {
					token: "test-token",
					profileUrl: "",
					id: "",
					_raw: "",
					_json: {
						iss: "",
						aud: "",
						sub: "",
						iat: 0,
						exp: 0,
					},
					provider: "",
					displayName: "",
				},
			} as unknown as Request;
			const res = {
				redirect: jest.fn(),
			} as unknown as Response;

			const userToken: UserToken = {
				token: "test-token",
				profileUrl: "",
				id: "",
				_raw: "",
				_json: {
					iss: "",
					aud: "",
					sub: "",
					iat: 0,
					exp: 0,
				},
				provider: "",
				displayName: "",
			};

			googleController.googleCallback(req, res);
			const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
			expect(res.redirect).toHaveBeenCalledWith(
				`${frontendUrl}/frontCallback/${(req.user as UserToken).token}`,
			);
		});
	});
});
