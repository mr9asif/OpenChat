import { Router } from "express";

import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { aiModelController } from "./aiModel.controller";
import { aiModelValidation } from "./aiModel.validation";

const router = Router();

router.post(
  "/",
  auth(Role.ADMIN),
  validateRequest(aiModelValidation.createModelSchema),
  aiModelController.createModel,
);

router.get("/", auth(Role.ADMIN), aiModelController.getAllModels);

router.get("/:id", auth(Role.ADMIN), aiModelController.getSingleModel);

router.patch(
  "/:id",
  auth(Role.ADMIN),
  validateRequest(aiModelValidation.updateModelSchema),
  aiModelController.updateModel,
);

router.delete("/:id", auth(Role.ADMIN), aiModelController.deleteModel);

export const aiModelRoutes = router;
