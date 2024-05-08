import { Response, NextFunction } from "express";
import middleware from "../../src/middlewares/auth";
import ResponseStatus from "../../src/types/response-codes";
import { decode } from "../../src/utils/create-token";
import user from "../../src/models/user";
import { RequestUser } from "../../src/types";
import setUpLogs from "../../src/utils/logs";
setUpLogs();

jest.mock("../../src/utils/create-token", () => ({
	decode: jest.fn(),
}));

jest.mock("../../src/models/user", () => ({
	findOne: jest.fn(),
}));

describe("Auth Middleware", () => {
	let mockReq: Partial<RequestUser>;
	let mockRes: Partial<Response>;
	let mockNext: Partial<NextFunction>;

	beforeEach(() => {
		mockReq = {
			headers: {
				token: "",
			},
		};
		mockRes = {
			status: jest.fn().mockReturnThis(),
			send: jest.fn(),
		};
		mockNext = jest.fn();
		jest.clearAllMocks();
	});

	test("should respond with Unauthorized if no token is provided", async () => {
		await middleware(
			mockReq as RequestUser,
			mockRes as Response,
			mockNext as NextFunction,
		);

		expect(mockRes.status).toHaveBeenCalledWith(ResponseStatus.UNAUTHORIZED);
		expect(mockRes.send).toHaveBeenCalledWith("Unauthorized");
	});

	test("should respond with Unauthorized if token is invalid", async () => {
		(mockReq.headers as { token: string }).token = "someToken";
		(decode as jest.Mock).mockReturnValueOnce(null);

		try {
			await middleware(
				mockReq as RequestUser,
				mockRes as Response,
				mockNext as NextFunction,
			);
		} catch (error) {
			expect(decode).toHaveBeenCalledWith("someToken");
			expect(mockRes.status).toHaveBeenCalledWith(ResponseStatus.UNAUTHORIZED);
			expect(mockRes.send).toHaveBeenCalledWith("Unauthorized");
		}
	});

	test("should respond with Unauthorized if user not found", async () => {
		const tokenData = { email: "user@example.com" };
		(mockReq.headers as { token: string }).token = "someToken";
		(decode as jest.Mock).mockReturnValueOnce(tokenData);
		(user.findOne as jest.Mock).mockResolvedValue(null);

		try {
			await middleware(
				mockReq as RequestUser,
				mockRes as Response,
				mockNext as NextFunction,
			);
		} catch (error) {
			expect(user.findOne).toHaveBeenCalledWith({ email: tokenData.email });
			expect(mockRes.status).toHaveBeenCalledWith(ResponseStatus.UNAUTHORIZED);
			expect(mockRes.send).toHaveBeenCalledWith("Unauthorized");
		}
	});

	test("should call next if user is found", async () => {
		const tokenData = { email: "user@example.com" };
		const foundUser = { email: "user@example.com", id: "123" };
		(mockReq.headers as { token: string }).token = "someToken";
		(decode as jest.Mock).mockReturnValueOnce(tokenData);
		(user.findOne as jest.Mock).mockResolvedValue(foundUser);

		await middleware(
			mockReq as RequestUser,
			mockRes as Response,
			mockNext as NextFunction,
		);

		expect(user.findOne).toHaveBeenCalledWith({ email: tokenData.email });
		expect(mockReq.user).toEqual(foundUser);
		expect(mockNext).toHaveBeenCalled();
	});

	test("should respond with Internal Server Error if database query fails", async () => {
		const tokenData = { email: "user@example.com" };
		(mockReq.headers as { token: string }).token = "someToken";
		(decode as jest.Mock).mockReturnValueOnce(tokenData);
		(user.findOne as jest.Mock).mockRejectedValueOnce(
			new Error("Generic error"),
		);

		try {
			await middleware(
				mockReq as RequestUser,
				mockRes as Response,
				mockNext as NextFunction,
			);
		} catch (error) {
			expect(mockRes.status).toHaveBeenCalledWith(
				ResponseStatus.INTERNAL_SERVER_ERROR,
			);
			expect(mockRes.send).toHaveBeenCalledWith("Something went wrong");
		}
	});
});
