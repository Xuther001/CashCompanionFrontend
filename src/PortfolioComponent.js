import React, { useState } from 'react';

function PortfolioComponent() {
  const [investments, setInvestments] = useState([]);
  const [newInvestment, setNewInvestment] = useState({
    name: '',
    shares: 0,
    purchasePrice: 0,
    currentPrice: 0,
  });

  // Functions to handle user input and add new investments
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvestment({ ...newInvestment, [name]: value });
  };

  const addInvestment = () => {
    setInvestments([...investments, newInvestment]);
    setNewInvestment({
      name: '',
      shares: 0,
      purchasePrice: 0,
      currentPrice: 0,
    });
  };

  // Render the list of investments
  const investmentList = investments.map((investment, index) => (
    <div key={index}>
      <p>Stock Symbol: {investment.name} || Shares: {investment.shares} || Purchase Price: {investment.purchasePrice} || Current Price: {investment.currentPrice}</p>
    </div>
  ));

  return (
    <div>
      <h2>Investment Tracker</h2>
      <div>
        <h3>Add New Investment</h3>
        <label htmlFor="name">Stock Symbol:</label>
        <input
          type="text"
          name="name"
          value={newInvestment.name}
          onChange={handleInputChange}
        />
        <label htmlFor="shares">Shares:</label>
        <input
          type="number"
          name="shares"
          value={newInvestment.shares}
          onChange={handleInputChange}
        />
        <label htmlFor="purchasePrice">Purchase Price:</label>
        <input
          type="number"
          name="purchasePrice"
          value={newInvestment.purchasePrice}
          onChange={handleInputChange}
        />
        <label htmlFor="currentPrice">Current Price:</label>
        <input
          type="number"
          name="currentPrice"
          value={newInvestment.currentPrice}
          onChange={handleInputChange}
        />
        <div style={{ textAlign: 'center' }}>
          <button style={{ marginTop: '10px' }} onClick={addInvestment}>Add Investment</button>
        </div>
      </div>
      <div>
        <h3>Your Investments</h3>
        {investmentList}
      </div>
    </div>
  );
}

export default PortfolioComponent;