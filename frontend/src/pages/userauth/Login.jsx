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

  // get function
  let { loginUser } = useContext(AuthContext);

  // get fetching
  let { fetching } = useContext(AuthContext);

  useEffect(() => {}, [fetching]);

  // Calling loginUser function upon submitting form
  return authTokens ? (
    <Navigate to="/" />
  ) : (
    <div className="userauth-page-wrapper">
      <img className="userauth-bg" src={background}></img>
      {fetching ? (
        <div className="login-form-cont">
          <p className="login-form-prompt">Login</p>
          <hr className="login-form-line"></hr>
          <form className="login-form" onSubmit={loginUser}>
            <fieldset className="form-disabled" disabled="disabled">
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
      ) : (
        <div className="login-form-cont">
          <p className="login-form-prompt">Login</p>
          <hr className="login-form-line"></hr>
          <form className="login-form" onSubmit={loginUser}>
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
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
