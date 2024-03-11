import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

// Importing styles
import "../../pagestyles/Activate.css";

// Importing assets
import background from "../../assets/userauthbg.webp";

// Importing AuthContext (login function) for login page
import AuthContext from "../../context/UserauthContext";

const Activate = () => {
  // Implement if authorized
  let { authTokens } = useContext(AuthContext);

  // get function
  let { activateUser } = useContext(AuthContext);

  // Get params from url
  const { uid, token } = useParams();

  // Runs when loading into site
  useEffect(() => {
    activateUser(uid, token);
  });

  return authTokens ? (
    <Navigate to="/" />
  ) : (
    <div className="userauth-page-wrapper">
      <img className="userauth-bg" src={background}></img>
      <div className="activate-form-cont">
        <p className="activate-user-prompt">
          Your account has been successfully created!
        </p>
        <p className="activate-ty-prompt">Thank you for choosing our website</p>
      </div>
    </div>
  );
};

export default Activate;
