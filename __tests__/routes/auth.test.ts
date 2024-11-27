import bodyParser from "body-parser";
import express from "express";
import request from "supertest";
import usersController from "../../src/controllers/users.controller";
import authRouter from "../../src/routes/auth";
import setUpLogs from "../../src/utils/logs";
setUpLogs();

// Mock del usersController
jest.mock("../../src/controllers/users.controller");

const app = express();
app.use(bodyParser.json());
app.use("/auth", authRouter);

describe("Auth Routes", () => {
	describe("POST /auth/signup", () => {
		test("should handle signup", async () => {
			(usersController.signUp as jest.Mock).mockImplementation((req, res) =>
				res.status(200).send(req.body),
			);

			const newUser = {
				name: "John Doe",
				email: "john.doe@example.com",
				username: "JohnDoe",
				password: "securePassword123", // pragma: allowlist secret
			};

			const response = await request(app).post("/auth/signup").send(newUser);

			expect(response.status).toBe(200);
			expect(response.body).toEqual(newUser);
			expect(usersController.signUp).toHaveBeenCalled();
		});
	});

	describe("POST /auth/login", () => {
		test("should handle login", async () => {
			(usersController.logIn as jest.Mock).mockImplementation((req, res) =>
				res.status(200).json({ token: "fakeToken123" }),
			);

			const userCredentials = {
				email: "john.doe@example.com",
				password: "securePassword123", // pragma: allowlist secret
			};

			const response = await request(app)
				.post("/auth/login")
				.send(userCredentials);

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("token", "fakeToken123");
			expect(usersController.logIn).toBeCalled();
		});
	});
});
