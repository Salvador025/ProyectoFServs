import { Response, NextFunction } from "express";
import { RequestUser } from "../types";
import Roles from "../types/roles";
import ResponseStatus from "../types/response-codes";

export default (...roles: Roles[]) =>
	(req: RequestUser, res: Response, next: NextFunction) => {
		const { role } = req.user;
		if (!role || !roles.includes(role)) {
			res.status(ResponseStatus.FORBIDDEN).send("don't have permission");
			return;
		}
		next();
	};
