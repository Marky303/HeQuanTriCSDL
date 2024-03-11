import React, { useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

// Importing style
import "../../pagestyles/ResetPassword.css";

// Importing assets
import background from "../../assets/userauthbg.webp";

// Importing AuthContext (signup function) for signup page
import AuthContext from "../../context/UserauthContext";

const ResetPassword = () => {
  // Implement if authorized
  let { authTokens } = useContext(AuthContext);

  // Get function from context
  let { sendResetRequest } = useContext(AuthContext);

  let { fetching } = useContext(AuthContext);
  useEffect(() => {}, [fetching]);

  return authTokens ? (
    <Navigate to="/dash" />
  ) : (
    <div className="userauth-page-wrapper">
      <img className="userauth-bg" src={background}></img>
      {fetching ? (
        <div className="resetpassword-form-cont">
          <p className="resetpassword-form-prompt">Reset Password</p>
          <hr className="resetpassword-form-line"></hr>
          <form className="resetpassword-form" onSubmit={sendResetRequest}>
            <fieldset disabled="disabled" className="form-disabled">
              <p className="form-spec">Email</p>
              <input
                className="form-input"
                type="text"
                name="email"
                placeholder="Enter your email"
              />
              <button className="resetpassword-submit-btn" type="submit">
                Get email
              </button>
              <div className="resetpassword-redirect-cont">
                <Link to="/login" className="resetpassword-redirect">
                  Login
                </Link>
                <span className="or-redirect-text">|</span>
                <Link to="/signup" className="resetpassword-redirect">
                  Sign up
                </Link>
              </div>
            </fieldset>
          </form>
        </div>
      ) : (
        <div className="resetpassword-form-cont">
          <p className="resetpassword-form-prompt">Reset Password</p>
          <hr className="resetpassword-form-line"></hr>
          <form className="resetpassword-form" onSubmit={sendResetRequest}>
            <p className="form-spec">Email</p>
            <input
              className="form-input"
              type="text"
              name="email"
              placeholder="Enter your email"
            />
            <button className="resetpassword-submit-btn" type="submit">
              Get email
            </button>
            <div className="resetpassword-redirect-cont">
              <Link to="/login" className="resetpassword-redirect">
                Login
              </Link>
              <span className="or-redirect-text">|</span>
              <Link to="/signup" className="resetpassword-redirect">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
