import { Router, Request, Response } from "express";
import roles from "../middlewares/roles";
import Roles from "../types/roles";

const router = Router();

router.get("/:username", (req: Request, res: Response) => {
	res.send(`User ${req.params.username} boards`);
});

router.post(
	"/:username",
	roles(Roles.Creator, Roles.Admin),
	(req: Request, res: Response) => {
		res.send("Board created");
	},
);

router.get("/:username/:id", (req: Request, res: Response) => {
	res.send(`Board ${req.params.id}`);
});

router.put(
	"/:username/:id",
	roles(Roles.Creator, Roles.Admin),
	(req: Request, res: Response) => {
		res.send(`Board ${req.params.id} updated`);
	},
);

router.delete(
	"/:username/:id",
	roles(Roles.Creator, Roles.Admin),
	(req: Request, res: Response) => {
		res.send(`Board ${req.params.id} deleted`);
	},
);

export default router;
