// src/services/chatService.js
// Mock implementation - replace with actual API calls
let mockMessages = [
    {
      id: 1,
      sender: 'agent',
      text: 'Hello! How can I help you today?',
      timestamp: new Date(Date.now() - 60000).toISOString(),
      read: true
    }
  ];
  
  export const initChat = async () => {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ chatId: 'chat-123' });
      }, 300);
    });
  };
  
  export const getMessages = async () => {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([...mockMessages]);
      }, 300);
    });
  };
  
  export const sendMessage = async (text) => {
    // Add user message
    const userMessage = {
      id: mockMessages.length + 1,
      sender: 'user',
      text,
      timestamp: new Date().toISOString(),
      read: true
    };
    
    mockMessages.push(userMessage);
    
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        // Add agent response after a delay
        setTimeout(() => {
          const agentMessage = {
            id: mockMessages.length + 1,
            sender: 'agent',
            text: `Thanks for your message: "${text}". How else can I assist you?`,
            timestamp: new Date().toISOString(),
            read: false
          };
          mockMessages.push(agentMessage);
        }, 3000);
        
        resolve();
      }, 300);
    });
  };