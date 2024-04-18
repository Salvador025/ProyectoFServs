import { Router, Response } from "express";
import auth from "../middlewares/auth";

import { RequestUser } from "../types";
const router = Router();

/**
 * @swagger
 * /users/:username:
 *  get:
 *   tags: [Users]
 *   description: get list of users in plataform
 *   responses:
 *    200:
 *     description: success
 *    400:
 *     description: bad request
 */
router.get("/users/:username", auth, (req: RequestUser, res: Response) =>
	res.send(req.user),
);

export default router;
