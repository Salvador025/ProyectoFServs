import { Router } from "express";
import usersController from "../controllers/users.controller";

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
router.post("/login", usersController.logIn);

export default router;
