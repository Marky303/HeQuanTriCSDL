import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";

// Importing style
// import "../../pagestyles/Signup.css";

// Importing AuthContext (signup function) for signup page
import AuthContext from "../../context/UserauthContext";

const ResetPasswordConfirm = () => {
  // Implement if authorized
  let { authTokens } = useContext(AuthContext);

  return authTokens ? (
    <Navigate to="/dash" />
  ) : (
    <div className="resetp-form-cont">reset pass page</div>
  );
};

export default ResetPasswordConfirm;
