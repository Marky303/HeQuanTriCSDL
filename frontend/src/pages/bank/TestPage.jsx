import React, { useState, useEffect, useContext } from "react";

// Import style
import "../../pagestyles/bank/TestPage.css"

// Importing bank context
import BankContext from "../../context/BankContext";

// Import notify context
import NotifyContext from "../../context/NotifyContext";

const TestPage = () => {
  let { notify } = useContext(NotifyContext);

  let { createCard } = useContext(BankContext);
  let createCardHandler = () => {
    let name = prompt("Please enter card name:");
    if (name == null || name == "") {
      notify("warning", "Cancelled adding card");
    } else {
      createCard(name);
    }
  };

  let { makeTransaction } = useContext(BankContext);
  let makeTransactionHandler = () => {
    let name = prompt("Please enter transaction name:");
    if (name == null || name == "") {
      notify("warning", "Cancelled make transaction");
      return;
    }
    let id = prompt("Please enter card id:");
    if (id == null || id == "") {
      notify("warning", "Cancelled make transaction");
      return;
    }
    let amount = prompt("Please enter amount:");
    if (amount == null || amount == "") {
      notify("warning", "Cancelled make transaction");
      return;
    }
    makeTransaction(name, id, amount);
  };

  return (
    <div className="testpage-cont">
      <button
        className="testpage-opencard-btn"
        onClick={() => {
          createCardHandler();
        }}
      >
        Open new card
      </button>
      <button
        className="testpage-opencard-btn"
        onClick={() => {
          makeTransactionHandler();
        }}
      >
        Make new transaction
      </button>
    </div>
  );
};

export default TestPage;
