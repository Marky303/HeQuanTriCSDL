import React, { useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

// Importing style
import "../../pagestyles/Login.css";

// Importing assets
import background from "../../assets/userauthbg.webp";

// Importing AuthContext (login function) for login page
import AuthContext from "../../context/UserauthContext";

const Login = () => {
  // Implement if authorized
  let { authTokens } = useContext(AuthContext);

  // Get function
  let { loginUser } = useContext(AuthContext);

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
    loginUser(e);
  };

  // Calling loginUser function upon submitting form
  return authTokens ? (
    <Navigate to="/" />
  ) : (
    <div className="userauth-page-wrapper">
      <img className="userauth-bg" src={background}></img>
      <div className="login-form-cont">
        <p className="login-form-prompt">Login</p>
        <hr className="login-form-line"></hr>
        <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
          <fieldset className="form-disabled">
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
            <button className="login-submit-btn" type="submit">
              Login
            </button>
            <div className="login-redirect-cont">
              <Link to="/signup" className="login-redirect">
                Sign up
              </Link>
              <span className="or-redirect-text">|</span>
              <Link to="/resetpassword" className="login-redirect">
                Reset password
              </Link>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
