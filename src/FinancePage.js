import './ChatComponent.css';
import SlidingStockPriceComponent from './SlidingStockPriceComponent';
import NoteFormComponent from './NoteFormComponent';
import NewsComponent from './NewsComponent';
import PortfolioComponent from './PortfolioComponent';
import ChatGPTComponent from './ChatGPTComponent';
import FirebaseComponent from './FirebaseChatComponent';

const ChatComponent = () => {

  return (
    <div className="chat-container">
      <SlidingStockPriceComponent />
      <FirebaseComponent />
      <PortfolioComponent />
      <NoteFormComponent />
      <NewsComponent />
      <ChatGPTComponent />
    </div>
  );
};

export default ChatComponent;