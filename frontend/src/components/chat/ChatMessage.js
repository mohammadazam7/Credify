// src/components/chat/ChatMessage.js
import React from 'react';

const ChatMessage = ({ message }) => {
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={`chat-message ${message.sender === 'user' ? 'user-message' : 'agent-message'}`}>
      <div className="message-content">
        <p>{message.text}</p>
      </div>
      <div className="message-timestamp">
        {formattedTime}
      </div>
    </div>
  );
};

export default ChatMessage;