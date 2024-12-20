import { Request, Response } from "express";
import { Profile } from "passport-google-oauth20";
import userModel from "../models/user";
import { User, UserToken } from "../types";
import Roles from "../types/roles";
import { code } from "../utils/create-token";

class googleController {
	createUser(profile: Profile): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const mail = profile.emails?.[0].value;
			userModel
				.findOne({ email: mail })
				.then((user) => {
					if (user) {
						return Promise.resolve(user);
					}
					const userData: User = {
						name: profile.displayName,
						username: profile.displayName.replace(" ", "_").toLowerCase(),
						email: profile.emails?.[0].value,
						role: Roles.USER,
						image: profile.photos?.[0].value,
					};
					return Promise.resolve(userModel.create(userData));
				})
				.then((user) => {
					const token = code({ name: user.name, email: user.email });
					resolve(token);
				})
				.catch((err) => {
					consoleError(err);
					reject(err);
				});
		});
	}

	googleCallback(req: Request, res: Response) {
		const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
		res.redirect(
			`${frontendUrl}/frontCallback/${(req.user as UserToken).token}`,
		);
	}
}

export default new googleController();
