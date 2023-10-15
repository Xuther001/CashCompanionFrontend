import React, { useState } from 'react';
import axios from 'axios';
import './NewsComponent.css';

function NewsComponent() {
  const [symbols, setSymbols] = useState('');
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = 'https://api.marketaux.com/v1/news/all';
  const apiToken = '3j093jlEqGG7PwLTJTS24BTbUQOodTdirzPPmJ7M';

  const handleSymbolsChange = (e) => {
    setSymbols(e.target.value);
  };

  const fetchNewsData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(apiUrl, {
        params: {
          symbols: symbols,
          filter_entities: true,
          language: 'en',
          api_token: apiToken,
        },
      });

      setNewsData(response.data.data);
    } catch (error) {
      console.error('Error fetching news data:', error);
    }

    setLoading(false);
  };

  return (
    <div className="news-container">
      <h2>Financial News</h2>
      <div className="news-fetch-news">
        <label htmlFor="symbols">Enter Symbols (e.g., TSLA, AMZN, MSFT):</label>
        <input
          type="text"
          id="symbols"
          name="symbols"
          value={symbols}
          onChange={handleSymbolsChange}
          required
        />
        <button onClick={fetchNewsData}>Fetch News</button>
      </div>
      {loading ? (
        <p>Loading news data...</p>
      ) : (
        <div className="news-list-container">
          <ul className="news-list">
            {newsData.map((newsItem, index) => (
              <li key={index}>{newsItem.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NewsComponent;