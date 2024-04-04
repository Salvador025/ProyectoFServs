import dotenv from "dotenv";
dotenv.config();
import { decode, code } from "../../src/utils/create-token";
import { InputToken } from "../../src/types";

describe("code", () => {
	it("should return a valid token", () => {
		const data: InputToken = { name: "test", email: "test@test.com" };
		const token = code(data);
		expect(token).toBeDefined();
	});
});

describe("decode", () => {
	it("should return decoded token if valid", () => {
		const token =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTcxMjE4ODgwNH0.E-Yiml2gLBA6oK9BuFF850-2I7AxpBdgD8iJAMWMcZA"; // pragma: allowlist secret
		const decodedToken = decode(token);
		expect(decodedToken).toEqual({
			name: "test",
			email: "test@test.com",
			iat: 1712188804,
		});
	});

	it("should return null if token is invalid", () => {
		const token = "invalid_token";
		const decodedToken = decode(token);
		expect(decodedToken).toBeNull();
	});
});
