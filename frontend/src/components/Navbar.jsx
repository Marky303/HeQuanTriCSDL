import React, { useContext, useEffect } from "react";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";

// Importing style
import "../pagestyles/Navbar.css";

// Importing assets
import logo from "../assets/logo.jpg";

// Importing context
import AuthContext from "../context/UserauthContext.jsx";
import NotifyContext from "../context/NotifyContext";

// Importing toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  // Implement if authorized
  let { authTokens } = useContext(AuthContext);

  // Getting user information
  let { userInfo } = useContext(AuthContext);

  // Get logout function
  let { logoutUser } = useContext(AuthContext);

  // Get notification from NotifyContext
  let { notification } = useContext(NotifyContext);

  // Display when theres a notification
  useEffect(() => {
    // Note that no parenthesis is used here
    notification;
  }, [notification]);

  // TODO: change profile edit <Link> to <button>
  return (
    <div className="navbar-cont">
      <Link to={authTokens ? "/" : "/home"} className="home-link-cont">
        <img className="logo-pic" src={logo}></img>
        <p className="app-name">Bank</p>
      </Link>

      <div className="search-cont">
        {authTokens ? (
          <div className="nouser-content-cont">
          <div className="filler"></div>
          <div className="nouser-button-cont">
            <a className="navbar-anchor" href="/bank/test">
              <button className="navbar-anchor-btn">Test</button>
            </a>
            <a className="navbar-anchor" href="/bank/cards">
              <button className="navbar-anchor-btn">Cards</button>
            </a>
            <a className="navbar-anchor" href="/bank/transaction">
              <button className="navbar-anchor-btn">Transaction</button>
            </a>  
            <a className="navbar-anchor" href="/bank/dashboard">
              <button className="navbar-anchor-btn">DashBoard</button>
            </a>  
          </div>
        </div>
        ) : (
          <div className="nouser-content-cont">
            <div className="filler"></div>
            <div className="nouser-button-cont">
              <a className="navbar-anchor" href="/contacts">
                <button className="navbar-anchor-btn">Contacts</button>
              </a>
              <a className="navbar-anchor" href="/learn">
                <button className="navbar-anchor-btn">Learn more</button>
              </a>
              <a className="navbar-anchor" href="/products">
                <button className="navbar-anchor-btn">Products</button>
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="userauth-wrapper">
        {authTokens ? (
          <div className="auth-view-cont">
            <p className="welcome-text">
              <Link to="/profileedit" className="welcome-prompt-cont">
                Hello {userInfo ? userInfo.name : ""}!{" "}
              </Link>
            </p>
            <button className="logout-btn" onClick={logoutUser}>
              Logout
            </button>
          </div>
        ) : (
          <div className="unauth-view-cont">
            <div className="filler"></div>
            <Link to="login">
              <button className="login-btn">Login</button>
            </Link>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
