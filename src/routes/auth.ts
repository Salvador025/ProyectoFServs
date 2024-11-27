import { Router } from "express";
import usersController from "../controllers/users.controller";
import auth from "../middlewares/auth";

const router = Router();

router.post("/signup", usersController.signUp);

router.post("/login", usersController.logIn);

router.get("/me", auth, usersController.getMe);

export default router;
