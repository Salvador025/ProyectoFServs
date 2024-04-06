import { Request, Response, NextFunction } from "express";
import ResponseStatus from "../types/response-codes";
import { decode } from "../utils/create-token";
import user from "../models/user";
import { RequestUser } from "../types";
import { JwtPayload } from "jsonwebtoken";

export default (req: RequestUser, res: Response, next: NextFunction) => {
	const token: string = (req as Request).headers.token as string;
	if (!token) {
		res.status(ResponseStatus.UNAUTHORIZED).send("Unauthorized");
		return;
	}
	const data = decode(token);
	if (!data) {
		res.status(ResponseStatus.UNAUTHORIZED).send("Unauthorized");
		return;
	}

	user
		.findOne({ email: (data as JwtPayload).email })
		.then((user) => {
			if (!user) {
				res.status(ResponseStatus.UNAUTHORIZED).send("Unauthorized");
				return;
			}
			req.user = user;
			next();
		})
		.catch((error) => {
			res
				.status(ResponseStatus.INTERNAL_SERVER_ERROR)
				.send("Something went wrong");
			console.error(error);
		});
};
