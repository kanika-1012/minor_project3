import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import { createChatBotMessage } from 'react-chatbot-kit';

// ActionProvider: defines how the bot should respond.
class ActionProvider {
  createChatBotMessage: Function;
  setStateFunc: Function;

  constructor(createChatBotMessage: Function, setStateFunc: Function) {
    this.createChatBotMessage = createChatBotMessage;
    this.setStateFunc = setStateFunc;
  }

  // Handle incoming message and decide on a response.
  handleMessage = (message: string) => {
    let response = "";
    if (message.includes("stress") || message.includes("anxious") || message.includes("worried")) {
      response = "I understand you're feeling stressed. Have you tried any relaxation techniques? Sometimes, talking to a professional can help.";
    } else if (message.includes("sad") || message.includes("depressed") || message.includes("lonely")) {
      response = "I'm sorry you're feeling this way. It might be beneficial to speak with someone who can help. Would you consider booking an appointment with a counselor?";
    } else if (message.includes("appointment") || message.includes("book") || message.includes("schedule")) {
      response = "To book an appointment, please click the 'Schedule Now' button above.";
    } else {
      response = "I'm here to help. Could you please share a bit more about how you're feeling?";
    }

    const botMessage = this.createChatBotMessage(response);
    this.setStateFunc((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
}

// MessageParser: receives user messages and calls the ActionProvider.
class MessageParser {
  actionProvider: ActionProvider;
  constructor(actionProvider: ActionProvider) {
    this.actionProvider = actionProvider;
  }
  parse(message: string) {
    // Convert the message to lowercase and pass it to the action provider.
    this.actionProvider.handleMessage(message.toLowerCase());
  }
}

// Chatbot configuration
const config = {
  botName: "MentalHealthBot",
  initialMessages: [
    createChatBotMessage("Hi, I'm your mental health assistant. How can I help you today?")
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#17d059",
    },
    chatButton: {
      backgroundColor: "#17d059",
    },
  },
};

export function CustomChatbot() {
  return (
    <Chatbot
      config={config}
      actionProvider={ActionProvider}
      messageParser={MessageParser}
    />
  );
}

