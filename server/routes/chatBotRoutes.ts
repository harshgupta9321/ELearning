import express from 'express';
import { getChatbotResponse } from '../controllers/chatbotController';

const chatBotrouter = express.Router();

// Post route to handle chatbot messages
chatBotrouter.post('/chat', getChatbotResponse);

export default chatBotrouter;
