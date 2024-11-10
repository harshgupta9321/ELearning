import React from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import axios from 'axios';

// Define the shape of the response from the backend
interface ChatbotResponse {
  response: string;
}

const ChatbotWidget: React.FC = () => {

  // Handle user message and get response from backend
  const handleNewUserMessage = async (newMessage: string): Promise<void> => {
    try {
      // Make an API request to the backend
      const response = await axios.post<ChatbotResponse>('https://elearning-rsrr.onrender.com/api/v1/chat', {
        message: newMessage,
      });

      // Add the response from OpenAI to the chat
      addResponseMessage(response.data.response);
    } catch (error) {
      console.error('Error:', error);
      addResponseMessage('Sorry, something went wrong.');
    }
  };

  return (
    <div className="chatbot-widget fixed bottom-4 right-4 z-50">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="Chatbot"
        subtitle="Ask me anything about our platform!"
      />
    </div>
  );
};

export default ChatbotWidget;
