import React, { useEffect, useState, useRef } from 'react';
import { w3cwebsocket as WebSocket } from 'websocket';
import './ChatComponent.css';
import SlidingStockPriceComponent from './SlidingStockPriceComponent';
import NoteFormComponent from './NoteFormComponent';
import NewsComponent from './NewsComponent';
import PortfolioComponent from './PortfolioComponent';
import ChatGPTComponent from './ChatGPTComponent';

const ChatComponent = ({ token }) => {

  const chatBoxRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [receiverUsername, setReceiverUsername] = useState('');

  useEffect(() => {
    const newWebSocket = new WebSocket('ws://localhost:8080/ws');
    setWs(newWebSocket);

    newWebSocket.onopen = () => {
      // Once the WebSocket connection is open, you can send the token
      const tokenMessage = {
        type: 'token',
        token: localStorage.getItem('authToken'),
      };
      console.log('WebSocket connection is open');
      newWebSocket.send(JSON.stringify(tokenMessage));
    };

    newWebSocket.onmessage = message => {
      const newMessage = JSON.parse(message.data);
      setMessages(prevMessages => [...prevMessages, newMessage]);
    };

    return () => {
      newWebSocket.close();
    };
  }, []);

  const sendMessage = () => {
    //ws && ws.readyState === WebSocket.OPEN this checks that ws is not null or undefined & checks for condition below
    //ws.readyState === WebSocket.OPEN this condition will check if socket is open
    if (ws && ws.readyState === WebSocket.OPEN && inputMessage.trim() !== '' && receiverUsername.trim() !== '') {
      const messageData = {
        content: inputMessage,
        senderUsername: localStorage.getItem('username'),
        receiverUsername: receiverUsername,
      };
      ws.send(JSON.stringify(messageData));
      setInputMessage('');
    } else {
      console.log('WebSocket is not open or missing input.');
    }

    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
  if (chatBoxRef.current) {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }
  }, [messages]);

  return (
    <div className="chat-container">
      <SlidingStockPriceComponent />
      <div className="chat-box" style={{ height: '800px', width: '620px' }} ref={chatBoxRef}>
        {messages.map((message, index) => (
          <div key={index} className="message">
            {/* <span className="receiver-username">{message.receiverUsername}</span> */}
            <span className="content">{message.content}</span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          className="receiver-input"
          type="text"
          placeholder="Receiver's username..."
          value={receiverUsername}
          onChange={e => setReceiverUsername(e.target.value)}
        />
        <input
          className="message-input"
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
        />
        <button className="send-button" onClick={sendMessage}>Send</button>
      </div>
      <PortfolioComponent />
      <NoteFormComponent />
      <NewsComponent />
      <ChatGPTComponent />
    </div>
  );
};

export default ChatComponent;