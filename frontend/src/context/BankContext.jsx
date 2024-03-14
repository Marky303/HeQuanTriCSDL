import React, { createContext, useEffect, useState, useContext } from "react";
import { Outlet } from "react-router-dom";

// Import userauth context
import AuthContext from "./UserauthContext";

// Import notify context
import NotifyContext from "./NotifyContext";

// Create bank context
const BankContext = createContext();

export default BankContext;

export const BankProvider = () => {
  let { notify } = useContext(NotifyContext);

  // Import token
  let { authTokens } = useContext(AuthContext);

  // Context variables
  let [currentCard, setCurrentCard] = useState(null);

  let [currentTrans, setCurrentTrans] = useState(null);

  let [loading, setLoading] = useState(true);

  // bank related variables
  let [cards, setCards] = useState(() =>
    localStorage.getItem("cards")
      ? JSON.parse(localStorage.getItem("cards"))
      : null
  );

  // bank related functions
  let createCard = async (name) => {
    // Request to get all cards from user
    let response = await fetch("http://localhost:8000/bank/createcard/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        name: name,
      }),
    });
    let data = await response.json();

    if (response.status == 202) {
      notify("success", data.detail);
    } else {
      notify("error", data.detail);
    }
  };

  // bank related functions
  let makeTransaction = async (name, id, amount) => {
    // Request to get all cards from user
    let response = await fetch("http://localhost:8000/bank/maketransaction/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        name: name,
        amount: amount,
        id: id,
      }),
    });
    let data = await response.json();

    if (response.status == 202) {
      notify("success", data.detail);
    } else {
      notify("error", data.detail);
    }
  };

  let getCards = async () => {
    // Request to get all cards from user
    let response = await fetch("http://localhost:8000/bank/getcardsinfo/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    // Set card data
    setCards(data);
    localStorage.setItem("cards", JSON.stringify(data));

    // Set loading to false
    if (loading) setLoading(false);
  };

  let getTransactions = async (id, dayStart, dayEnd) => {
    // Request to get all transaction based on conditions
    let response = await fetch("http://localhost:8000/bank/gettransactionsinfo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        id: id,
        dayStart: dayStart,
        dayEnd: dayEnd,
      }),
    });
    let data = await response.json();

    if (response.status == 200) {
      setCurrentTrans(data);
    }
    else 
    {
        notify("error", "Cannot get transaction")
    }
  };

  let changeCurrentCard = (card) => {
    setCurrentCard(card);
  };

  useEffect(() => {
    if (loading) getCards();
  }, [currentCard]);

  let contextData = {
    // bank related variables
    cards: JSON.stringify(cards),
    currentCard: currentCard,
    currentTrans: currentTrans,

    // bank related functions
    changeCurrentCard: changeCurrentCard,
    createCard: createCard,
    makeTransaction: makeTransaction,
    getTransactions: getTransactions,
  };

  return (
    <BankContext.Provider value={contextData}>
      {<Outlet />}
    </BankContext.Provider>
  );
};
