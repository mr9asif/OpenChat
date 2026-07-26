import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { chatService } from "./chat.service";

const sendMessage = catchAsync(async (req, res) => {
  const result = await chatService.sendMessage(req.body.message);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Response generated successfully",
    data: result,
  });
});

export const chatController = {
  sendMessage,
};
