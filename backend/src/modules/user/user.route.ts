import { Router } from "express";
import { auth } from "../../middleware/auth";
import { userController } from "./user.controller";

const router = Router();

router.get("/me", auth, userController.userProfile);

export const UserRoute = router;
