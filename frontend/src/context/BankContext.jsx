import React, { createContext, useEffect, useState, useContext } from "react";
import { Outlet } from "react-router-dom";

// Import userauth context
import AuthContext from "./UserauthContext";

// Create bank context
const BankContext = createContext();

export default BankContext;

export const BankProvider = () => {
  // Import token
  let { authTokens } = useContext(AuthContext);

  let [loading, setLoading] = useState(true);

  // bank related variables
  let [cards, setCards] = useState(() =>
    localStorage.getItem("cards")
      ? JSON.parse(localStorage.getItem("cards"))
      : null
  );

  // bank related functions
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

  useEffect(() => {
    if (loading) getCards();
  }, [loading]);

  let contextData = {
    // bank related variables
    cards: JSON.stringify(cards),
    // bank related functions
  };

  return (
    <BankContext.Provider value={contextData}>
      {<Outlet />}
    </BankContext.Provider>
  );
};
