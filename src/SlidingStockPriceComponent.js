import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SlidingStockPriceComponent() {
  // State variables to store fetched data
  const [aaplQuote, setAaplQuote] = useState({});
  const [msftQuote, setMsftQuote] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the API endpoint URLs
    const aaplQuoteUrl = 'https://finnhub.io/api/v1/quote?symbol=aapl&token=sandbox_c683tuqad3iagio36ujg';
    const msftQuoteUrl = 'https://finnhub.io/api/v1/quote?symbol=msft&token=sandbox_c683tuqad3iagio36ujg';

    // Fetch AAPL (Apple Inc.) quote data
    axios
      .get(aaplQuoteUrl)
      .then((response) => {
        setAaplQuote(response.data);
        // Fetch MSFT (Microsoft Corporation) quote data
        axios
          .get(msftQuoteUrl)
          .then((msftResponse) => {
            setMsftQuote(msftResponse.data);
            setLoading(false);
          })
          .catch((msftError) => {
            console.error('Error fetching MSFT data:', msftError);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error('Error fetching AAPL data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Stock Quotes</h1>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          <h2>AAPL Quote</h2>
          <p>
            Symbol: {aaplQuote.symbol}<br />
            Last Price: {aaplQuote.c}<br />
            High: {aaplQuote.h}<br />
            Low: {aaplQuote.l}<br />
            Previous Close: {aaplQuote.pc}<br />
          </p>
          <h2>MSFT Quote</h2>
          <p>
            Symbol: {msftQuote.symbol}<br />
            Last Price: {msftQuote.c}<br />
            High: {msftQuote.h}<br />
            Low: {msftQuote.l}<br />
            Previous Close: {msftQuote.pc}<br />
          </p>
        </div>
      )}
    </div>
  );
}

export default SlidingStockPriceComponent;