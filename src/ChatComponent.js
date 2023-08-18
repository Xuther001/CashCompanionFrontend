import React, { useEffect, useState } from 'react';
import { w3cwebsocket as WebSocket } from 'websocket';
import './ChatComponent.css';

const ChatComponent = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const newWebSocket = new WebSocket('ws://localhost:8080/ws');
    setWs(newWebSocket);

    newWebSocket.onmessage = message => {
      const newMessage = JSON.parse(message.data);
      setMessages(prevMessages => [...prevMessages, newMessage]);
    };

    return () => {
      newWebSocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      const messageData = {
        content: inputMessage,
        token: token, // Include the token in the message
      };
      ws.send(JSON.stringify(messageData));
      setInputMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <span className="sender">{message.sender}:</span> {message.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;