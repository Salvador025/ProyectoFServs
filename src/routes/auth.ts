import { Router } from "express";
import usersController from "../controllers/users.controller";
import auth from "../middlewares/auth";

const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    required:
 *     - name
 *     - email
 *     - username
 *     - password
 *    properties:
 *     name:
 *      type: string
 *      default: John Doe
 *     email:
 *      type: string
 *      format: email
 *     username:
 *      type: string
 *      default: JohnDoe
 *     password:
 *      type: string
 *      default: JohnDoe
 */

/**
 * @swagger
 * /auth/signup:
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
 * /auth/login:
 *  post:
 *   description: user login
 *   tags: [Auth]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *         format: email
 *        password:
 *         type: string
 *   responses:
 *    200:
 *     description: authentication token
 *     content:
 *      application/json:
 *       schema:
 *        properties:
 *         token:
 *          type: string
 *    400:
 *     description: bad request (missing parameter)
 *    401:
 *     description: unauthorized (wrong credentials)
 */
router.post("/login", usersController.logIn);

router.get("/me", auth, usersController.getMe);

export default router;
