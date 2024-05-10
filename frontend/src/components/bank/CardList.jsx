import React, { useState, useEffect, useContext } from "react";
import List from "rc-virtual-list";

// Importing styles
import "../../pagestyles/bank/CardList.css";

// Importing bank context
import BankContext from "../../context/BankContext";

// Importing components
import Card from "../../components/bank/Card";

const CardList = () => {
  let { cards } = useContext(BankContext);
  let cardObjs = JSON.parse(cards);
  return (
    <div className="card-list-cont">
      {cardObjs.map((card) => {
        return <Card key={card.id} card={card} />;
      })}
    </div>
  );
};

export default CardList;
