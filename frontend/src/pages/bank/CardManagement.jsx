import React, { useState, useEffect, useContext } from "react";

// Import style
import "../../pagestyles/bank/CardManagement.css"

// Importing bank context
import BankContext from "../../context/BankContext";

// Importing components
import CardList from "../../components/bank/CardList";
import CardInfo from "../../components/bank/CardInfo";

const CardManagement = () => {
    let { cards } = useContext(BankContext);
    // let cardObjs = JSON.parse(cards);

  return (
    <div className="card-management-cont">
      <CardInfo />
      <CardList />
    </div>
  );
};

export default CardManagement;
