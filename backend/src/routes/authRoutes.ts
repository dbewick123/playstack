import { Router } from "express";
import {
  signupController,
  loginController,
  logoutController,
  getMeController,
} from "../controllers/authController.js";
import requireAuth from "../middleware/requireAuth.js";

const authRouter = Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);
authRouter.post("/logout", requireAuth, logoutController);
authRouter.get("/me", getMeController);

export default authRouter;
