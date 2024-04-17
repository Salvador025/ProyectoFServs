import { Request, Response } from "express";
import { Profile } from "passport-google-oauth20";
// import user from "../models/user";

class googleController {
	createUser(profile: Profile) {
		console.log(profile);
	}

	googleCallback(req: Request, res: Response) {
		console.log(req.user);

		res.redirect("/");
	}
}

export default new googleController();
