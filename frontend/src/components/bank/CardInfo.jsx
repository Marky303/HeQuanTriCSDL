import React, { useState, useEffect, useContext } from "react";

// Import style
import "../../pagestyles/bank/CardInfo.css";

// Importing bank context
import BankContext from "../../context/BankContext";

const CardInfo = () => {
  let { currentCard } = useContext(BankContext);
  
  useEffect (()=>{}, [currentCard])

  return <div className="card-info-cont"> Current card is {currentCard}</div>;
};

export default CardInfo;
