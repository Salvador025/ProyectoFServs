import user from "../models/user";
import { Request, Response } from "express";
import hashPassword from "../utils/hash-password";
import ResponseStatus from "../types/response-codes";
import { code as createToken } from "../utils/create-token";
import { InputToken, RequestUser } from "../types";
import Roles from "../types/roles";

class UsersController {
	signUp(req: Request, res: Response) {
		const data = {
			name: req.body.name,
			username: req.body.username,
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
					const data: InputToken = {
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

	changeRole(req: RequestUser, res: Response) {
		const { email } = req.user;
		const role = req.body.role;
		if (!Object.values(Roles).includes(role)) {
			res.status(ResponseStatus.BAD_REQUEST).send("Invalid role");
			return;
		}
		user
			.updateOne({ email }, { role })
			.then(() => {
				res.status(ResponseStatus.SUCCESS).send("Role changed");
			})
			.catch((error) => {
				res.status(ResponseStatus.BAD_REQUEST).send("Something went wrong");
				console.error(error);
			});
	}

	uploadProfilePicture(req: RequestUser, res: Response) {
		console.log(req.file);
		res.status(ResponseStatus.SUCCESS).send("req.file");
	}
}

export default new UsersController();
