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
      // Remove "$" sign from the input value
      const numericValue = value.replace('$', '');
      setNewInvestment({ ...newInvestment, [name]: `$${numericValue}` });
    } else {
      setNewInvestment({ ...newInvestment, [name]: value });
    }
  };

  const addInvestment = () => {
    setInvestments([...investments, newInvestment]);
    setNewInvestment({
      name: '',
      shares: 0,
      purchasePrice: "$",
    });
  };

  const investmentList = investments.map((investment, index) => (
    <div key={index}>
      <p>
        Stock Symbol: {investment.name} || Shares: {investment.shares} || Purchase Price: ${parseFloat(investment.purchasePrice.replace('$', '')).toLocaleString('en-US')}
      </p>
    </div>
  ));

  return (
    <div className="portfolio-container">
      <h2>Investment Tracker</h2>
      <div className="add-investment-container">
        <h3>Add New Investment</h3>
        <label className="add-investment-label" htmlFor="name">Stock Symbol:</label>
        <input
          className="add-investment-input"
          type="text"
          name="name"
          value={newInvestment.name}
          onChange={handleInputChange}
        />

        <label className="add-investment-label" htmlFor="shares">Shares:</label>
        <input
          className="add-investment-input"
          type="number"
          name="shares"
          value={newInvestment.shares}
          onChange={handleInputChange}
        />

        <label className="add-investment-label" htmlFor="purchasePrice">Purchase Price:</label>
        <input
          className="add-investment-input"
          type="string"
          name="purchasePrice"
          value={newInvestment.purchasePrice}
          onChange={handleInputChange}
        />

        <div style={{ textAlign: 'center' }}>
          <button className="add-investment-button" onClick={addInvestment}>Add Investment</button>
        </div>
      </div>
      <div className="investment-list-container">
        <h3>Your Investments:</h3>
        {investmentList}
      </div>
    </div>
  );
}

export default PortfolioComponent;