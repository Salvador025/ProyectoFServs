import { Router } from "express";
import usersController from "../controllers/users.controller";

const router = Router();

router.post("/signup", usersController.signUp);
router.post("/login", usersController.logIn);

export default router;
