import { Router, Request, Response } from "express";
import roles from "../middlewares/roles";
import Roles from "../types/roles";
import boardsController from "../controllers/boards.controller";
import { uploadBoard } from "../middlewares/upload-s3";

const router = Router();

/**
 * @swagger
 * /boards/:username:
 *  get:
 *   summary: User boards
 *   tags: [boards]
 *   description: Get all boards of a user
 */
router.get("/:username", (req: Request, res: Response) => {
	res.send(`User ${req.params.username} boards`);
});

/**
 * @swagger
 * /boards/:username:
 *  post:
 *   description: create new board
 *   tags: [boards]
 *   responses:
 *    200:
 *     description: new user registered successfully
 */
router.post(
	"/:username",
	roles(Roles.CREATOR, Roles.ADMIN),
	uploadBoard.single("Board"),
	boardsController.createBoard,
);

/**
 * @swagger
 * /boards/:username/:id:
 *  get:
 *   summary: Board
 *   tags: [boards]
 *   description: Get board by id
 */
router.get("/:username/:id", (req: Request, res: Response) => {
	res.send(`Board ${req.params.id}`);
});

/**
 * @swagger
 * /boards/:username/:id:
 *  put:
 *   description: update board
 *   tags: [boards]
 *   responses:
 *    200:
 *     description: board updated successfully
 */
router.put(
	"/:username/:id",
	roles(Roles.CREATOR, Roles.ADMIN),
	(req: Request, res: Response) => {
		res.send(`Board ${req.params.id} updated`);
	},
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
	"/:username/:id",
	roles(Roles.CREATOR, Roles.ADMIN),
	(req: Request, res: Response) => {
		res.send(`Board ${req.params.id} deleted`);
	},
);

export default router;
