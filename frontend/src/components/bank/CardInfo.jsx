import React, { useState, useEffect, useContext } from "react";

// Import style
import "../../pagestyles/bank/CardInfo.css";

// Importing components
import TransactionList from "../../components/bank/TransactionList";

// Importing bank context
import BankContext from "../../context/BankContext";

const CardInfo = () => {
  let { currentCard } = useContext(BankContext);
  let currentCardObj = JSON.parse(currentCard);
  let { getTransactions } = useContext(BankContext);
  let { getMonthlyValue } = useContext(BankContext);
  let { plus, minus } = useContext(BankContext);
  useEffect(() => {
    if (currentCard) {
      getTransactions(currentCardObj.id, "null", "null");
      getMonthlyValue(currentCardObj.id);
    }
  }, [currentCard]);

  return (
    <div className="card-info-cont">
      {currentCard ? (
        <div className="currentcard-cont">
          <div className="currentcard-topsection-cont">
            <div className="currentcard-balance-cont">
              <p className="currentcard-balance-prompt">Balance</p>
              <p className="currentcard-balance-value">{currentCardObj.bal}$</p>
              <p className="currentcard-name-prompt">Name</p>
              <p className="currentcard-name-value">
                {String(currentCardObj.cardName).toUpperCase()} //{" "}
                {currentCardObj.id}
              </p>
            </div>
            <div className="currentcard-thismonth">
              <p className="currentcard-thismonth-prompt">This month</p>
              <div className="currentcard-thismonth-receive">
                <p className="currentcard-rs-prompt">Receive</p>
                <p className="currentcard-rs-value">{plus?plus:0}</p>
              </div>
              <div className="currentcard-thismonth-spend">
                <p className="currentcard-rs-prompt">Spend</p>
                <p className="currentcard-rs-value">{minus?minus:0}</p>
              </div>
            </div>
          </div>
          <div className="currentcard-botsection-cont">
            <div className="currentcard-transaction-cont">
              <div className="currentcard-transaction-prompt">History</div>
              <div className="currentcard-transaction-list-cont">
                <TransactionList />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="choose-card-prompt">Please choose a card</div>
      )}
    </div>
  );
};

export default CardInfo;
