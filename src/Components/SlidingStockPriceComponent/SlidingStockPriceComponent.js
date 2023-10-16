import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SlidingStockPriceComponent.css'

function SlidingStockPriceComponent() {
  // State variables to store fetched data
  const [aaplQuote, setAaplQuote] = useState({});
  const [msftQuote, setMsftQuote] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the API endpoint URLs
    const aaplQuoteUrl = 'https://finnhub.io/api/v1/quote?symbol=aapl&token=ckifd3hr01qi7b5gm7dgckifd3hr01qi7b5gm7e0';
    const msftQuoteUrl = 'https://finnhub.io/api/v1/quote?symbol=msft&token=ckifd3hr01qi7b5gm7dgckifd3hr01qi7b5gm7e0';

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
    <div className="sliding-container">
      <marquee behavior="scroll" direction="left">
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <p>
            <strong>Apple's Quote:</strong> 
            Symbol: AAPL | 
            Last Price: {aaplQuote.c} | 
            High: {aaplQuote.h} | 
            Low: {aaplQuote.l} | 
            Previous Close: {aaplQuote.pc} | 

            <strong>Microsoft's Quote:</strong> 
            Symbol: MSFT | 
            Last Price: {msftQuote.c} | 
            High: {msftQuote.h} | 
            Low: {msftQuote.l} | 
            Previous Close: {msftQuote.pc}
          </p>
        )}
      </marquee>
    </div>
  );
}

export default SlidingStockPriceComponent;