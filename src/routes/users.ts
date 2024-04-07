import { Router, Response } from "express";
import usersController from "../controllers/users.controller";
import auth from "../middlewares/auth";
import { RequestUser } from "../types";

const router = Router();

/**
 * @swagger
 * /users:
 *  get:
 *   tags: [Users]
 *   description: get list of users in plataform
 *   responses:
 *    200:
 *     description: success
 *    400:
 *     description: bad request
 */
router.get("/:username", (req: RequestUser, res: Response) =>
	res.send(req.user),
);

router.put("/updateRole", auth, usersController.changeRole);

export default router;
