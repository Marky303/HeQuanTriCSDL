import React from 'react';
import './TransactionItem.css';
const TransactionItem = ({ date, description, amount, type }) => {
  return (
    <div className="transaction-item">
      <div>
        <span>Date: {date}</span>
      </div>
      <div>
        <span>Description: {description}</span>
      </div>
      <div>
        <span>Amount: ${amount}</span>
      </div>
      <div>
        <span>Type: {type}</span>
      </div>
    </div>
  );
};

export default TransactionItem;
