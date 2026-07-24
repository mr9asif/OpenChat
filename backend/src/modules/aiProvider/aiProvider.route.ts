import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { aiProviderValidation } from "./aiProvider.validation";

const router = Router();
router.post(
  "/",
  validateRequest(aiProviderValidation.createProviderSchema),
  aiProviderController.createProvider,
);

export const AiProviderRoute = router;
