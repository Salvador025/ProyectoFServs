import { Request, Response } from "express";
import user from "../models/user";
import { InputToken, RequestUser } from "../types";
import ResponseStatus from "../types/response-codes";
import Roles from "../types/roles";
import UnauthorizedError from "../utils/UnauthorizedError";
import { code as createToken } from "../utils/create-token";
import hashPassword from "../utils/hash-password";

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
					res
						.status(ResponseStatus.BAD_REQUEST)
						.send("Email already or Username already exists");
					return;
				}
				if (error.name === "ValidationError") {
					res.status(ResponseStatus.BAD_REQUEST).send("Invalid data");
					return;
				}
				res
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send("Something went wrong");
				consoleError(error);
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
				if (!user) {
					throw new UnauthorizedError("Unauthorized");
				}
				const data: InputToken = {
					name: user.name,
					email: user.email,
				};
				const token = createToken(data);
				res.status(ResponseStatus.SUCCESS).send({ token });
			})
			.catch((error) => {
				if (error instanceof UnauthorizedError) {
					res.status(ResponseStatus.UNAUTHORIZED).send("Unauthorized");
					return;
				}
				res
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send("Something went wrong");
				consoleError(error);
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
				res
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send("Something went wrong");
				consoleError(error);
			});
	}

	uploadProfilePicture(
		req: RequestUser & { file: { location: string } },
		res: Response,
	) {
		req.user.image = req.file.location;
		user
			.updateOne({ email: req.user.email }, { image: req.file.location })
			.then(() => {
				res.status(ResponseStatus.SUCCESS).send("Profile picture uploaded");
			})
			.catch((error) => {
				res
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send("Something went wrong");
				consoleError(error);
			});
	}

	getMe(req: RequestUser, res: Response) {
		const data = {
			username: req.user.username,
			image: req.user.image,
			role: req.user.role,
		};
		res.status(ResponseStatus.SUCCESS).json(data);
	}

	getProfile(req: RequestUser, res: Response) {
		const data = {
			email: req.user.email,
			username: req.user.username,
			name: req.user.name,
			role: req.user.role,
			image: req.user.image,
		};
		res.status(ResponseStatus.SUCCESS).json(data);
	}

	updateProfile(req: RequestUser, res: Response) {
		const { email } = req.user;
		const data = {
			username: req.body.username,
			name: req.body.name,
			password: hashPassword(req.body.password),
		};

		user
			.updateOne({ email }, data)
			.then(() => {
				res.status(ResponseStatus.SUCCESS).send("Profile updated");
			})
			.catch((error) => {
				if (error.code === 11000) {
					res
						.status(ResponseStatus.BAD_REQUEST)
						.send("Username already exists");
					return;
				}
				if (error.name === "ValidationError") {
					res.status(ResponseStatus.BAD_REQUEST).send("Invalid data");
					return;
				}
				res
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send("Something went wrong");
				consoleError(error);
			});
	}

	deleteProfile(req: RequestUser, res: Response) {
		const { email } = req.user;
		user
			.deleteOne({ email })
			.then(() => {
				res.status(ResponseStatus.SUCCESS).send("Profile deleted");
			})
			.catch((error) => {
				res
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send("Something went wrong");
				consoleError(error);
			});
	}
}

export default new UsersController();
