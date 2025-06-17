// src/contexts/ChatContext.js
import React, { createContext, useState, useEffect } from 'react';
import { initChat, sendMessage, getMessages } from '../services/chatService';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isAgentTyping, setIsAgentTyping] = useState(false);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const chatSession = await initChat();
        // Handle chat initialization if needed
      } catch (error) {
        console.error('Failed to initialize chat', error);
      }
    };

    initializeChat();
    
    // Poll for new messages every 10 seconds when chat is open
    let intervalId;
    if (isChatOpen) {
      intervalId = setInterval(fetchMessages, 10000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isChatOpen]);
  
  const fetchMessages = async () => {
    try {
      const newMessages = await getMessages();
      setMessages(newMessages);
      // Reset unread count when chat is open
      if (isChatOpen) {
        setUnreadCount(0);
      } else {
        // Count how many new messages
        const newCount = newMessages.filter(msg => !msg.read && msg.sender === 'agent').length;
        setUnreadCount(newCount);
      }
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  };

  const sendChatMessage = async (text) => {
    try {
      await sendMessage(text);
      // Simulate agent typing
      setIsAgentTyping(true);
      setTimeout(() => {
        setIsAgentTyping(false);
        fetchMessages();
      }, 3000);
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setUnreadCount(0);
    }
  };

  const value = {
    isChatOpen,
    messages,
    unreadCount,
    isAgentTyping,
    toggleChat,
    sendChatMessage
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};