import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

// Importing style
import "../../pagestyles/ResetPasswordConfirm.css";

// Importing AuthContext (resetpasswordconfirm function) for resetpasswordconfirm page
import AuthContext from "../../context/UserauthContext";

const ResetPasswordConfirm = () => {
  // Implement if authorized
  let { authTokens } = useContext(AuthContext);

  // Get params from url
  const { uid, token } = useParams();

  // Get function from Context
  let { resetPassword } = useContext(AuthContext);

  // get fetching
  let { fetching } = useContext(AuthContext);

  useEffect(() => {}, [fetching]);

  return authTokens ? (
    <Navigate to="/dash" />
  ) : fetching ? (
    <div className="resetpasswordconfirm-form-cont">
      <p className="resetpasswordconfirm-form-prompt">Reset your password</p>
      <hr className="resetpasswordconfirm-form-line"></hr>
      <form className="resetpasswordconfirm-form" onSubmit={resetPassword}>
        <fieldset className="form-disabled" disabled="disabled">
          <p className="form-spec">Password</p>
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <p className="form-spec">Password confirmation</p>
          <input
            className="form-input"
            type="password"
            name="repassword"
            placeholder="Re-enter your password"
          />
          <input type="hidden" name="uid" value={uid} />
          <input type="hidden" name="token" value={token} />
          <button className="resetpasswordconfirm-submit-btn" type="submit">
            Accept
          </button>
        </fieldset>
      </form>
    </div>
  ) : (
    <div className="resetpasswordconfirm-form-cont">
      <p className="resetpasswordconfirm-form-prompt">Reset your password</p>
      <hr className="resetpasswordconfirm-form-line"></hr>
      <form className="resetpasswordconfirm-form" onSubmit={resetPassword}>
        <p className="form-spec">Password</p>
        <input
          className="form-input"
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        <p className="form-spec">Password confirmation</p>
        <input
          className="form-input"
          type="password"
          name="repassword"
          placeholder="Re-enter your password"
        />
        <input type="hidden" name="uid" value={uid} />
        <input type="hidden" name="token" value={token} />
        <button className="resetpasswordconfirm-submit-btn" type="submit">
          Accept
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordConfirm;
