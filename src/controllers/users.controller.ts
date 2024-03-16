import user from "../models/user";
import { Request, Response } from "express";
import hashPassword from "../utils/hash-password";
import ResponseStatus from "../types/response-codes";
import { code as createToken } from "../utils/create-token";
import { inputToken } from "../types";

class UsersController {
	signUp(req: Request, res: Response) {
		const data = {
			name: req.body.name,
			password: hashPassword(req.body.password),
			email: req.body.email,
		};
		user
			.create(data)
			.then(() => {
				res.status(ResponseStatus.CREATED).send("User created");
			})
			.catch((error) => {
				if (error.code === 11000) {
					res.status(ResponseStatus.BAD_REQUEST).send("Email already exists");
					return;
				}
				if (error.name === "ValidationError") {
					res.status(ResponseStatus.BAD_REQUEST).send("Invalid data");
					return;
				}
				res.status(ResponseStatus.BAD_REQUEST).send("Something went wrong");
				console.error(error);
			});
	}

	logIn(req: Request, res: Response) {
		const data = {
			email: req.body.email,
			password: hashPassword(req.body.password),
		};

		user
			.findOne(data)
			.then((user) => {
				if (user) {
					const data: inputToken = {
						name: user.name,
						email: user.email,
					};
					const token = createToken(data);
					res.status(ResponseStatus.SUCCESS).send({ token });
				} else {
					res.status(ResponseStatus.UNAUTHORIZED).send("Invalid credentials");
				}
			})
			.catch((error) => {
				res
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send("Something went wrong");
				console.error(error);
			});
	}
}

export default new UsersController();
