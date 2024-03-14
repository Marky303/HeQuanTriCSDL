import React, { useState, useEffect, useContext } from "react";

// Import style
import "../../pagestyles/bank/CardInfo.css";

// Importing bank context
import BankContext from "../../context/BankContext";

const CardInfo = () => {
  let { currentCard } = useContext(BankContext);
  let currentCardObj = JSON.parse(currentCard);

  useEffect(() => {}, [currentCard]);

  return (
    <div className="card-info-cont">
      {currentCard ? (
        <div className="currentcard-cont">
          <div className="currentcard-topsection-cont">
            <div className="currentcard-balance-cont">
              <p className="currentcard-balance-prompt">Balance</p>
              <p className="currentcard-balance-value">{currentCardObj.bal}$</p>
              <p className="currentcard-name-prompt">Name</p>
              <p className="currentcard-name-value">{String(currentCardObj.name).toUpperCase()} // {currentCardObj.id}</p>
            </div>
            <div className="currentcard-thismonth">
              <p className="currentcard-thismonth-prompt">This month</p>
              <div className="currentcard-thismonth-receive">
                <p className="currentcard-rs-prompt">Receive</p>
                <p className="currentcard-rs-value">999</p>
              </div>
              <div className="currentcard-thismonth-spend">
                <p className="currentcard-rs-prompt">Spend</p>
                <p className="currentcard-rs-value">999</p>
              </div>
            </div>
          </div>
          <div className="currentcard-botsection-cont">

          </div>
        </div>
      ) : (
        <div className="choose-card-prompt">Please choose a card</div>
      )}
    </div>
  );
};

export default CardInfo;
