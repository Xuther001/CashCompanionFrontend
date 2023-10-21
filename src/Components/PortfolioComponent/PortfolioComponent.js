import React, { useState } from 'react';
import './PortfolioComponent.css';

function PortfolioComponent() {
  const [investments, setInvestments] = useState([]);
  const [newInvestment, setNewInvestment] = useState({
    name: '',
    shares: 0,
    purchasePrice: '$',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'purchasePrice') {
      const numericValue = value.replace('$', '');
      setNewInvestment({ ...newInvestment, [name]: `$${numericValue}` });
    } else {
      setNewInvestment({ ...newInvestment, [name]: value });
    }
  };

  const addInvestment = async () => {
    if (!newInvestment.name || newInvestment.shares <= 0 || !newInvestment.purchasePrice) {
      alert("Please fill out all required fields.");
      return;
    } 
    try {
      const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${newInvestment.name}&token=ckifd3hr01qi7b5gm7dgckifd3hr01qi7b5gm7e0`);
      const data = await response.json();
      
      const currentPrice = data.c;
      if (currentPrice === 0) {
        alert("Double check Stock Symbol. It may not be valid.");
        return;
      }
      const purchasePrice = parseFloat(newInvestment.purchasePrice.replace('$', ''));
      const shares = parseFloat(newInvestment.shares);
      const netGainOrLoss = (currentPrice - purchasePrice) * shares;

      setInvestments([...investments, { ...newInvestment, currentPrice, netGainOrLoss }]);
      setNewInvestment({
        name: '',
        shares: 0,
        purchasePrice: "$",
      });
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const investmentList = investments.map((investment, index) => (
    <div key={index}>
      <p>
        Stock Symbol: {investment.name} <br />
        Shares: {investment.shares} <br />
        Purchase Price: {investment.purchasePrice} <br />
        Current Price: {investment.currentPrice} <br />
        Net Gain/Loss: ${investment.netGainOrLoss.toFixed(2)}
      </p>
    </div>
  ));

  return (
    <div className="portfolio-container">
      <h2>Investment Tracker</h2>
      <div className="add-investment-container">
        <h3>Add New Investment</h3>
        <div className="input-group">
          <label className="add-investment-label" htmlFor="name">Stock Symbol:</label>
          <input
            className="add-investment-input"
            type="text"
            name="name"
            value={newInvestment.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label className="add-investment-label" htmlFor="shares">Shares:</label>
          <input
            className="add-investment-input"
            type="number"
            name="shares"
            value={newInvestment.shares}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label className="add-investment-label" htmlFor="purchasePrice">Purchase Price Per Share:</label>
          <input
            className="add-investment-input"
            type="string"
            name="purchasePrice"
            value={newInvestment.purchasePrice}
            onChange={handleInputChange}
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <button className="add-investment-button" onClick={addInvestment}>Add Investment</button>
        </div>
      </div>
      <div className="investment-list-container">
        <h3>Your Portfolio:</h3>
        {investmentList}
      </div>
    </div>
  );
}

export default PortfolioComponent;
