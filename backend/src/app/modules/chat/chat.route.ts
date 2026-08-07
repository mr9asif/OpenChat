// import express from "express";
// import { chatController } from "./chat.controller";

// import { auth } from "../../../middleware/auth";
// import { validateRequest } from "../../../middleware/validateRequest";
// import { chatValidation } from "./chat.validation";

// const router = express.Router();

// router.post(
//   "/",
//   auth(),
//   validateRequest(chatValidation),
//   chatController.sendMessage,
// );

// export const chatRoutes = router;

// ---------
import axios from "axios";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      `${process.env.OPENROUTER_BASE_URL}/chat/completions`,
      {
        model: "openrouter/free",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    res.json({
      success: true,
      response: response.data.choices[0].message.content,
    });
  } catch (error: any) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

export const chatRoutes = router;
