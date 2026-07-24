import { Router } from "express";

import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";

import { aiProviderController } from "./aiProvider.controller";
import { aiProviderValidation } from "./aiProvider.validation";

const router = Router();

router.post(
  "/",
  auth,
  validateRequest(aiProviderValidation.createProviderSchema),
  aiProviderController.createProvider,
);

router.get("/", auth, aiProviderController.getAllProvider);

router.get("/:id", auth, aiProviderController.getSingleProvider);

router.patch(
  "/:id",
  auth,
  validateRequest(aiProviderValidation.updateProviderSchema),
  aiProviderController.updateProvider,
);

router.delete("/:id", auth, aiProviderController.deleteProvider);

export const aiProviderRoute = router;
