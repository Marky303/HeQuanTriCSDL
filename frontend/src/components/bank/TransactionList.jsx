import React, { useState, useEffect, useContext } from "react";

// Import style
import "../../pagestyles/bank/TransactionList.css";

// Importing bank context
import BankContext from "../../context/BankContext";

const TransactionList = () => {
  let { currentTrans } = useContext(BankContext);

  useEffect(() => {
    console.log(currentTrans);
  }, [currentTrans]);

  return !currentTrans ? (
    <div> No transaction </div>
  ) : (
    <div className="transactionlist-cont">
      {currentTrans.map((Tran) => {
        let date = new Date(Tran.Tcreation);
        let YYYY = date.getFullYear();
        let MM = date.getMonth();
        let DD = date.getDate();
        let hh = date.getHours();
        let mm = date.getMinutes();
        let ss = date.getSeconds();
        let Tcreation =
          hh + ":" + mm + ":" + ss + " - " + DD + "/" + MM + "/" + YYYY;
        return (
          <div className="transaction-content">
            <div className="transaction-name">
              <p className="transaction-content-prompt">
                {Tran.transactionName.toUpperCase()}
              </p>
            </div>
            <div className="transaction-time">
              <p className="transaction-content-prompt">{Tcreation}</p>
            </div>
            <div className="transaction-amount">
              <p className="transaction-content-prompt">{Tran.amount}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionList;
