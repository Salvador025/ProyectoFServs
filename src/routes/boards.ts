import { Router } from "express";
import boardsController from "../controllers/boards.controller";
import roles from "../middlewares/roles";
import { uploadBoard } from "../middlewares/upload-s3";
import Roles from "../types/roles";

const router = Router();

router.get("/", boardsController.getBoards);

router.get("/:username", boardsController.getBoardsUser);

router.post(
	"/",
	roles(Roles.CREATOR, Roles.ADMIN),
	uploadBoard.single("Board"),
	boardsController.createBoard,
);

router.get("/:username/:name", boardsController.getBoard);

router.put(
	"/:name",
	roles(Roles.CREATOR, Roles.ADMIN),
	uploadBoard.single("Board"),
	boardsController.updateBoard,
);

router.delete(
	"/:name",
	roles(Roles.CREATOR, Roles.ADMIN),
	boardsController.deleteBoard,
);

export default router;
