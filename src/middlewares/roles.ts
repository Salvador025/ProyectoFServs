import { NextFunction, Response } from "express";
import { RequestUser } from "../types";
import ResponseStatus from "../types/response-codes";
import Roles from "../types/roles";

export default (...roles: Roles[]) =>
	(req: RequestUser, res: Response, next: NextFunction) => {
		const { role } = req.user;
		if (!role || !roles.includes(role)) {
			res.status(ResponseStatus.FORBIDDEN).send("don't have permission");
			return;
		}
		next();
	};
