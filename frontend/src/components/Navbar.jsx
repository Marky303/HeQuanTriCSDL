import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Importing style
import "../pagestyles/Navbar.css";

// Importing assets
import logo from "../assets/logo.jpg";

// Importing context
import AuthContext from "../context/UserauthContext";

const Navbar = () => {
  // Implement if authorized
  let { authTokens } = useContext(AuthContext);

  // get logout function
  let { logoutUser } = useContext(AuthContext);

  return (
    <div className="navbar-cont">
      <Link to="/dash" className="home-link-cont">
        <img className="logo-pic" src={logo}></img>
        <p className="app-name">App name</p>
      </Link>

      <div className="search-cont">
        <p className="placeholder-text">This is a search bar</p>
      </div>

      <div className="userauth-wrapper">
        {authTokens ? (
          <div className="auth-view-cont">
            <p className="welcome-text"> Hello user! </p>
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
    </div>
  );
};

export default Navbar;
