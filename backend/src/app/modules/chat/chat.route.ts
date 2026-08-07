import express from "express";
import { chatController } from "./chat.controller";

import { auth } from "../../../middleware/auth";
import { validateRequest } from "../../../middleware/validateRequest";
import { chatValidation } from "./chat.validation";

const router = express.Router();

router.post(
  "/",
  auth(),
  validateRequest(chatValidation),
  chatController.sendMessage,
);

router.get("/models", chatController.getAvailableModels);

export const chatRoutes = router;
