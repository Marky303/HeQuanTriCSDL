import React, { useState, useEffect, useContext } from "react";

// Importing bank context
import BankContext from "../../context/BankContext";

// Importing components
import CardList from "../../components/bank/CardList";

const CardManagement = () => {
//   let { cards } = useContext(BankContext);
//   let cardObjs = JSON.parse(cards);

  return <div><CardList></CardList></div>;
};

export default CardManagement;
