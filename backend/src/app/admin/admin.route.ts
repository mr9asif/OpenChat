import express from "express";

import { auth } from "../../middleware/auth";

import { adminController } from "./admin.controller";

const router = express.Router();

router.get("/dashboard", auth("ADMIN"), adminController.getDashboard);

export const adminRoutes = router;
