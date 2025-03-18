import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm your mental health assistant. How can I help you today?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setIsTyping(true);

    // Simple rule-based responses
    const response = generateResponse(userMessage.toLowerCase());
    
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: response, isBot: true }]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (message: string): string => {
    if (message.includes('stress') || message.includes('anxious') || message.includes('worried')) {
      return "I understand you're feeling stressed. Would you like to schedule an appointment with a counselor? They can provide professional guidance and support.";
    } else if (message.includes('sad') || message.includes('depressed') || message.includes('lonely')) {
      return "I'm sorry you're feeling this way. Speaking with a mental health professional can really help. Would you like me to help you book an appointment?";
    } else if (message.includes('appointment') || message.includes('book') || message.includes('schedule')) {
      return "I can help you schedule an appointment. Please click the 'Schedule Now' button above to book a time with our counselors.";
    } else {
      return "I'm here to listen and help. Would you like to talk more about what's on your mind or would you prefer to speak with a counselor?";
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-lg shadow-lg">
      <div className="flex items-center p-4 border-b">
        <MessageSquare className="w-6 h-6 text-blue-500 mr-2" />
        <h3 className="text-lg font-semibold">Mental Health Assistant</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isBot ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.isBot
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-blue-500 text-white'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}