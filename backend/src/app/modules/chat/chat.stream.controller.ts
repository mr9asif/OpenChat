import { Response } from "express";

import { AuthRequest } from "../../../middleware/auth";
import { catchAsync } from "../../../utils/catchAsync";

import { chatStreamService } from "./chat.stream.service";

const streamMessage = catchAsync(async (req: AuthRequest, res: Response) => {
  console.log("controller", req.body);
  await chatStreamService.streamMessage(
    {
      ...req.body,
      userId: req.user!.id,
    },
    res,
  );
});

export const chatStreamController = {
  streamMessage,
};
