import { Router, Response } from "express";
import usersController from "../controllers/users.controller";
import auth from "../middlewares/auth";

import { RequestUser } from "../types";
const router = Router();

/**
 * @swagger
 * /signup:
 *  post:
 *   description: register new user
 *   tags: [Auth]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/User'
 *   responses:
 *    200:
 *     description: new user registered successfully
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 */
router.post("/signup", usersController.signUp);

/**
 * @swagger
 * /login:
 *  post:
 *   description: login user
 *   tags: [Auth]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Login'
 *   responses:
 *    200:
 *     description: user logged in successfully
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Login'
 */
router.post("/login", usersController.logIn);

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
router.get("/users/:username", auth, (req: RequestUser, res: Response) =>
	res.send(req.user),
);

export default router;
