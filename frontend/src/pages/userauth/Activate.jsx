import React, { useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

// Importing styles
import '../../pagestyles/Activate.css'

// Importing AuthContext (login function) for login page
import AuthContext from "../../context/UserauthContext";

const Activate = () => {
  // Implement if authorized
  let { authTokens } = useContext(AuthContext);

  // get function
  let { activateUser } = useContext(AuthContext);

  // Get params from url
  const { uid, token } = useParams();

  return authTokens ? (
    <Navigate to="/" />
  ) : (
    <div className="activate-form-cont">
        <p className="activate-user-prompt">Activate your account</p>
        <button className="activate-user-btn" onClick={activateUser(uid,token)}>Click me</button>
    </div>
  );
};

export default Activate;
