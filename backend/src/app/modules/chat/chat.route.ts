import express from "express";
import { chatController } from "./chat.controller";

import { auth } from "../../../middleware/auth";
import { validateRequest } from "../../../middleware/validateRequest";
import { chatStreamController } from "./chat.stream.controller";
import { chatValidation } from "./chat.validation";

const router = express.Router();

router.post(
  "/",
  auth(),
  validateRequest(chatValidation),
  chatController.sendMessage,
);

router.get("/models", chatController.getAvailableModels);

router.get("/conversations", auth(), chatController.getConversations);

router.get(
  "/conversations/:id/messages",
  auth(),
  chatController.getConversationMessages,
);
router.delete("/conversations/:id", auth(), chatController.deleteConversation);

router.post("/stream", auth(), chatStreamController.streamMessage);
router.get("/usage", auth(), chatController.getUsage);

export const chatRoutes = router;
