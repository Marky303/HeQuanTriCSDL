import React, { useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

// Importing style
import "../../pagestyles/Signup.css";

// Importing assets
import background from "../../assets/userauthbg.webp";

// Importing AuthContext (signup function) for signup page
import AuthContext from "../../context/UserauthContext";

const Signup = () => {
  // Implement if authorized
  let { authTokens } = useContext(AuthContext);

  // get function
  let { signupUser } = useContext(AuthContext);

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
    signupUser(e);
  };

  return authTokens ? (
    <Navigate to="/" />
  ) : (
    <div className="userauth-page-wrapper">
      <img className="userauth-bg" src={background}></img>
      <div className="signup-form-cont">
        <p className="signup-form-prompt">Sign Up</p>
        <hr className="signup-form-line"></hr>
        <form className="signup-form" onSubmit={(e) => handleSubmit(e)}>
          <fieldset className="form-disabled">
            <p className="form-spec">Username</p>
            <input
              className="form-input"
              type="text"
              name="username"
              placeholder="Enter your username"
            />
            <p className="form-spec">Email</p>
            <input
              className="form-input"
              type="text"
              name="email"
              placeholder="Enter your email"
            />
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
            <button className="signup-submit-btn" type="submit">
              Sign up
            </button>
            <div className="signup-redirect-cont">
              <Link to="/login" className="signup-redirect">
                Login
              </Link>
              <span className="or-redirect-text">|</span>
              <Link to="/resetpassword" className="signup-redirect">
                Reset password
              </Link>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Signup;
