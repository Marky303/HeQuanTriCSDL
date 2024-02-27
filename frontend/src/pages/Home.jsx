import React, { useState, useEffect, useContext } from 'react'
import { Navigate } from "react-router-dom";

// Importing authContext to get tokens
import AuthContext from "../context/UserauthContext";

const Home = () => {
  // Implement if authorized
  let { authTokens } = useContext(AuthContext);

  // Private route implemented TODO
  return (
    authTokens ?
    <div className="home-page-cont">
      This is the home page
    </div>
    :
    <Navigate to="/login" />
  );
};

export default Home;
