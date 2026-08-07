import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { chatService } from "./chat.service";

const sendMessage = catchAsync(async (req, res) => {
  const result = await chatService.sendMessage(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Response generated successfully",
    data: result,
  });
});

const getAvailableModels = catchAsync(async (req, res) => {
  const result = await chatService.getAvailableModels();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Models fetched successfully",
    data: result,
  });
});

export const chatController = {
  sendMessage,
  getAvailableModels,
};
