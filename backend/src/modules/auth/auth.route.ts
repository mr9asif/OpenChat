import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.loginUser);
router.post("/refreshToken", authController.refreshToken);
router.post("/logout", authController.logout);
export const AuthRouter = router;
