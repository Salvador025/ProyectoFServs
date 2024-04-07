import { Router, Request, Response } from "express";
import boardsRoutes from "./boards";
import usersRoutes from "./users";
import auth from "../middlewares/auth";
import marketplaceRoutes from "./marketplace";

const router = Router();

//swagger for index board
/**
 * @swagger
 * /:
 *  get:
 *   summary: Index route
 *   tags: [Index]
 *   description: Index route
 */
router.get("/", (req: Request, res: Response) => {
	res.send("Index routes works!");
});

router.use("/marketplace", auth, marketplaceRoutes);
router.use("/users", usersRoutes);
router.use("/boards", auth, boardsRoutes);

export default router;
