// src/components/chat/LiveChat.js
import React, { useContext, useState, useRef, useEffect } from 'react';
import { ChatContext } from '../../contexts/ChatContext';
import ChatMessage from './ChatMessage';

const LiveChat = () => {
  const { isChatOpen, messages, unreadCount, isAgentTyping, toggleChat, sendChatMessage } = useContext(ChatContext);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (isChatOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;
    
    sendChatMessage(inputMessage);
    setInputMessage('');
  };

  return (
    <div className={`live-chat-container ${isChatOpen ? 'open' : ''}`}>
      {/* Chat Button */}
      <button 
        className="chat-toggle-btn"
        onClick={toggleChat}
      >
        {isChatOpen ? (
          <span>✕</span>
        ) : (
          <>
            <span>Chat with us</span>
            {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
          </>
        )}
      </button>
      
      {/* Chat Panel */}
      {isChatOpen && (
        <div className="chat-panel">
          <div className="chat-header">
            <h3>Customer Support</h3>
            <p>We typically reply within a few minutes</p>
          </div>
          
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <p>Welcome! How can we help you today?</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
              ))
            )}
            
            {isAgentTyping && (
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Type your message here..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button type="submit">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LiveChat;