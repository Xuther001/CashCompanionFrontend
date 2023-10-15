import './FinancePage.css';
import SlidingStockPriceComponent from '../Components/SlidingStockPriceComponent/SlidingStockPriceComponent';
import NoteFormComponent from '../Components/NoteFormComponent/NoteFormComponent';
import NewsComponent from '../Components/NewsComponent/NewsComponent';
import PortfolioComponent from '../Components/PortfolioComponent/PortfolioComponent';
import ChatGPTComponent from '../Components/ChatGPTComponent/ChatGPTComponent';
import FirebaseComponent from '../Components/FirebaseChatComponent/FirebaseChatComponent';

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