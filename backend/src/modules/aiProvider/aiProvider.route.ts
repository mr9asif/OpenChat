import { Router } from "express";

import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";

import { aiProviderController } from "./aiProvider.controller";
import { aiProviderValidation } from "./aiProvider.validation";

const router = Router();

router.post(
  "/",
  auth(Role.ADMIN),
  validateRequest(aiProviderValidation.createProviderSchema),
  aiProviderController.createProvider,
);

router.get("/", auth(Role.ADMIN), aiProviderController.getAllProvider);

router.get("/:id", auth(Role.ADMIN), aiProviderController.getSingleProvider);

router.patch(
  "/:id",
  auth(Role.ADMIN),
  validateRequest(aiProviderValidation.updateProviderSchema),
  aiProviderController.updateProvider,
);

router.delete("/:id", auth(Role.ADMIN), aiProviderController.deleteProvider);

export const aiProviderRoute = router;
