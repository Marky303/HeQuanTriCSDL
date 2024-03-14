import React, { useState, useEffect, useContext } from "react";

// Importing bank context
import BankContext from "../../context/BankContext";

// Importing components
import Card from "../../components/bank/Card";

const CardList = () => {
  let { cards } = useContext(BankContext);
  let cardObjs = JSON.parse(cards);

  return (
    <div>
      {cardObjs.map((card) => {
        return <Card key={card.id} card={card}/>;
      })}
    </div>
  );
};

export default CardList;
