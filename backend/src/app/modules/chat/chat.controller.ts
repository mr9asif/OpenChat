import { Response } from "express";
import { AuthRequest } from "../../../middleware/auth";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { chatService } from "./chat.service";

const sendMessage = catchAsync(async (req: AuthRequest, res: Response) => {
  const result = await chatService.sendMessage({
    userId: req.user!.id,
    ...req.body,
  });

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

const getConversations = catchAsync(async (req: AuthRequest, res) => {
  const result = await chatService.getConversations(req.user!.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Conversations fetched successfully",
    data: result,
  });
});

const getConversationMessages = catchAsync(async (req: AuthRequest, res) => {
  const result = await chatService.getConversationMessages(
    req.params.id as string,
    req.user!.id,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Conversation fetched successfully",
    data: result,
  });
});

const deleteConversation = catchAsync(
  async (req: AuthRequest, res: Response) => {
    await chatService.deleteConversation(req.params.id as string, req.user!.id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Conversation deleted successfully",
      data: null,
    });
  },
);
export const chatController = {
  sendMessage,
  getAvailableModels,
  getConversations,
  getConversationMessages,
  deleteConversation,
};
