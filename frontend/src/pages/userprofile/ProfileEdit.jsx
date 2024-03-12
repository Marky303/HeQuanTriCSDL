import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

// Importing style
import "../../pagestyles/ProfileEdit.css";

// Importing assets
import background from "../../assets/userauthbg.webp";

// Importing AuthContext (profileedit function) for profileedit page
import AuthContext from "../../context/UserauthContext";

const ProfileEdit = () => {
  let { authTokens } = useContext(AuthContext);

  // Private route implemented
  return authTokens ? (
    <div className="profileedit-page-wrapper">
      <img className="profileedit-bg" src={background}></img>
      <div className="profileedit-form-cont">
        <p className="profileedit-form-prompt">User settings</p>
        <hr className="profileedit-form-line"></hr>
        <form className="profileedit-form" onSubmit={console.log("submitted")}>
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
            <button className="profileedit-submit-btn" type="submit">
              profileedit
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProfileEdit;
