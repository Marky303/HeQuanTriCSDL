import React, { useState, useEffect, useContext } from "react";

// Importing bank context
import BankContext from "../../context/BankContext";

// Import card style
import "../../pagestyles/bank/Card.css";

const Card = ({ card }) => {
  // Convert py datetime to date
  let date = new Date(card.expiration);
  let year = String(date.getFullYear()).slice(2);
  let month = String(date.getMonth());
  let exprDate = month + " / " + year;


  let { changeCurrentCard } = useContext(BankContext);

  let cardClickHandler = () => {
    changeCurrentCard(JSON.stringify(card));
  }

  return (
    <div className="container">
      <button className="card" onClick={()=>cardClickHandler()}>
        <div className="card-inner">
          <div className="front">
            <img
              src="https://source.unsplash.com/random/200x200?sig=1"
              className="map-img"
            />
            <div className="row">
              <img
                className="chipvisa-picture"
                src="https://i.ibb.co/G9pDnYJ/chip.png"
              />
              <img
                className="chipvisa-picture"
                src="https://i.ibb.co/WHZ3nRJ/visa.png"
                width="60px"
              />
            </div>
            <div className="row card-no">
              <p>{card.number.slice(0, 4)}</p>
              <p>{card.number.slice(4, 8)}</p>
              <p>{card.number.slice(8, 12)}</p>
              <p>{card.number.slice(12)}</p>
            </div>
            <div className="row card-holder">
              <p>CARD NAME_</p>
              <p>VALID TILL</p>
            </div>
            <div className="row name">
              <p>{card.name.toUpperCase()}</p>
              <p>{exprDate}</p>
            </div>
          </div>
          <div className="back">
            <img src="https://i.ibb.co/PYss3yv/map.png" className="map-img" />
            <div className="bar"></div>
            <div className="row card-cvv">
              <div>
                <img src="https://i.ibb.co/S6JG8px/pattern.png" />
              </div>
              <p>{card.cvv}</p>
            </div>
            <div className="row card-text">
              <p>This card is a demo.</p>
            </div>
            <div className="row signature">
              <p className="customer-sig">CUSTOMER SIGNATURE</p>
              <img
                className="visa-back-picture"
                src="https://i.ibb.co/WHZ3nRJ/visa.png"
              />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Card;
