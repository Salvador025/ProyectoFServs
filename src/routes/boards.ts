import { Router } from "express";
import roles from "../middlewares/roles";
import Roles from "../types/roles";
import boardsController from "../controllers/boards.controller";
import { uploadBoard } from "../middlewares/upload-s3";

const router = Router();

/**
 * @swagger
 * /boards:
 *  get:
 *   summary: All boards
 *   tags: [boards]
 *   description: Get all boards
 */
router.get("/", boardsController.getBoards);

/**
 * @swagger
 * /boards/:username:
 *  get:
 *   summary: User boards
 *   tags: [boards]
 *   description: Get all boards of a user
 */
router.get("/:username", boardsController.getBoardsUser);

/**
 * @swagger
 * /boards:
 *  post:
 *   description: create new board
 *   tags: [boards]
 *   responses:
 *    200:
 *     description: new user registered successfully
 */
router.post(
	"/",
	roles(Roles.CREATOR, Roles.ADMIN),
	uploadBoard.single("Board"),
	boardsController.createBoard,
);

/**
 * @swagger
 * /boards/:username/:name:
 *  get:
 *   summary: Board
 *   tags: [boards]
 *   description: Get board by name
 */
router.get("/:username/:name", boardsController.getBoard);

/**
 * @swagger
 * /boards/:name:
 *  put:
 *   description: update board
 *   tags: [boards]
 *   responses:
 *    200:
 *     description: board updated successfully
 */
router.put(
	"/:name",
	roles(Roles.CREATOR, Roles.ADMIN),
	uploadBoard.single("Board"),
	boardsController.updateBoard,
);

/**
 * @swagger
 * /boards/:username/:id:
 *  delete:
 *   description: delete board
 *   tags: [boards]
 *   responses:
 *    200:
 *     description: board deleted successfully
 */
router.delete(
	"/:name",
	roles(Roles.CREATOR, Roles.ADMIN),
	boardsController.deleteBoard,
);

export default router;
