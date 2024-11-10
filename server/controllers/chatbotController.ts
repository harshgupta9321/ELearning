import { Request, Response, NextFunction } from "express";
import { OpenAI } from "openai";
import ErrorHandler from "../utils/Errorhandler";

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: "OPENAI_API_KEY", // Replace with your OpenAI API key
});

// This will handle user messages and return OpenAI's response
export const getChatbotResponse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body; // Get the user's message from the request

  try {
    // Send the message to the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // You can change to a different model if needed
      messages: [{ role: "user", content: message }],
    });

    // Extract the reply from OpenAI
    const chatbotReply = response.choices[0].message.content;

    // Send the reply back to the client
    res.status(200).json({ success: true, response: chatbotReply });
  } catch (error: any) {
    console.error("Error:", error);
    return next(new ErrorHandler(error.message, 500));
  }
};
