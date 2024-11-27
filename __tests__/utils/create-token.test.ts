import dotenv from "dotenv";
dotenv.config();
import { InputToken } from "../../src/types";
import { code, decode } from "../../src/utils/create-token";
import setUpLogs from "../../src/utils/logs";
setUpLogs();

jest.mock("jsonwebtoken", () => ({
	sign: jest.fn(() => "mocked_token"),
	verify: jest.fn((token: string) => {
		if (token === "valid_token") {
			return {
				name: "test",
				email: "test@test.com",
				iat: 1712188804,
			};
		}
		throw new Error("Invalid token");
	}),
}));

describe("create-token", () => {
	describe("code", () => {
		test("should return a valid token", () => {
			const data: InputToken = { name: "test", email: "test@test.com" };
			const token = code(data);
			expect(token).toBe("mocked_token");
		});
	});

	describe("decode", () => {
		test("should return decoded token if valid", () => {
			const token = "valid_token";
			const decodedToken = decode(token);
			expect(decodedToken).toEqual({
				name: "test",
				email: "test@test.com",
				iat: 1712188804,
			});
		});

		test("should return null if token is invalid", () => {
			const token = "invalid_token";
			const decodedToken = decode(token);
			expect(decodedToken).toBeNull();
		});
	});
});
