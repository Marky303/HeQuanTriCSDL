import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

// Importing style
import "../../pagestyles/ResetPasswordConfirm.css";

// Importing assets
import background from "../../assets/userauthbg.webp";

// Importing AuthContext (resetpasswordconfirm function) for resetpasswordconfirm page
import AuthContext from "../../context/UserauthContext";

const ResetPasswordConfirm = () => {
  // Implement if authorized
  let { authTokens } = useContext(AuthContext);

  // Get params from url
  const { uid, token } = useParams();

  // Get function from Context
  let { resetPassword } = useContext(AuthContext);

  // Get fetching
  let { fetching } = useContext(AuthContext);
  useEffect(() => {
    let element = document.getElementsByClassName("form-disabled");
    if (fetching) element[0].setAttribute("disabled", "disabled");
    else element[0].removeAttribute("disabled");
  }, [fetching]);
  // Retain fields on failed request
  let handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(e);
  };

  useEffect(() => {}, [fetching]);

  return authTokens ? (
    <Navigate to="/" />
  ) : (
    <div className="userauth-page-wrapper">
      <img className="userauth-bg" src={background}></img>
        <div className="resetpasswordconfirm-form-cont">
          <p className="resetpasswordconfirm-form-prompt">
            Reset your password
          </p>
          <hr className="resetpasswordconfirm-form-line"></hr>
          <form className="resetpasswordconfirm-form" onSubmit={(e) => handleSubmit(e)}>
            <fieldset className="form-disabled">
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
    </div>
  );
};

export default ResetPasswordConfirm;
