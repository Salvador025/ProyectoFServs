import { Response, NextFunction } from "express";
import { RequestUser } from "../types";
import Roles from "../types/roles";
import ResponseStatus from "../types/response-codes";

module.exports =
	(...roles: Roles[]) =>
	(req: RequestUser, res: Response, next: NextFunction) => {
		const { role } = req.user;
		if (!role || !roles.includes(role)) {
			res.status(ResponseStatus.UNAUTHORIZED).send("Unauthorized");
			return;
		}
		next();
	};
