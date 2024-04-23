import { Router, Request, Response } from "express";
import authRoutes from "./auth";
import boardsRoutes from "./boards";
import googleRoutes from "./google";
import settingsRoute from "./settings";
import marketplaceRoutes from "./marketplace";
import auth from "../middlewares/auth";

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

router.use("/auth", authRoutes);
router.use("/auth/google", googleRoutes);
router.use("/boards", auth, boardsRoutes);
router.use("/settings", auth, settingsRoute);
router.use("/marketplace", auth, marketplaceRoutes);

export default router;
