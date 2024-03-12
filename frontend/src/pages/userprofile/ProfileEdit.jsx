import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

// Importing style
import "../../pagestyles/ProfileEdit.css";

// Importing assets
import background from "../../assets/userauthbg.webp";

// Importing AuthContext (profileedit function) for profileedit page
import AuthContext from "../../context/UserauthContext";

const ProfileEdit = () => {
  let { authTokens } = useContext(AuthContext);
  let { userInfo } = useContext(AuthContext);

  useEffect(() => {
    // Updating text fields
    let element;
    const textFieldList = ["email", "name", "currentJob", "currentLocation", "shortDesc"];
    for (let i of textFieldList) {
      element = document.getElementsByName(i)[0]
      element.setAttribute("value", userInfo[i])
    }
  }, [])

  // Private route implemented
  return authTokens ? (
    <div className="profileedit-page-wrapper">
      <img className="profileedit-bg" src={background}></img>
      <div className="profileedit-form-cont">
        <p className="profileedit-form-prompt">User settings</p>
        <hr className="profileedit-form-line"></hr>
        <form className="profileedit-form">
          <fieldset className="form-disabled">
            <div className="profileedit-fields-twocolumn">
              <div className="form-spec-wrapper">
                <p className="form-spec">Email</p>
                <input
                  className="profileedit-form-input"
                  type="text"
                  name="email"
                  placeholder="Edit your email"
                />
              </div>
              <div className="form-spec-wrapper">
                <p className="form-spec">Name</p>
                <input
                  className="profileedit-form-input"
                  type="text"
                  name="name"
                  placeholder="Edit your name"
                />
              </div>
              <div className="form-spec-wrapper">
                <p className="form-spec">Profession</p>
                <input
                  className="profileedit-form-input"
                  type="text"
                  name="currentJob"
                  placeholder="Edit your profession"
                />
              </div>
              <div className="form-spec-wrapper">
                <p className="form-spec">Location</p>
                <input
                  className="profileedit-form-input"
                  type="text"
                  name="currentLocation"
                  placeholder="Edit your location"
                />
              </div>
            </div>
            <div className="form-spec-wrapper">
              <p className="form-spec">Short description</p>
              <input
                className="profileedit-form-input-desc"
                type="text"
                name="shortDesc"
                placeholder="Edit your description"
              />
            </div>
            <div className="userskill-cont">
              <p className="form-spec">Skills</p>
              <div className="userskill-list-cont">

                <div className="userskill-content">
                  <p className="userskill-text">Skill 1</p>
                  <button className="userskill-delete-btn">x</button>
                </div>

                <div className="userskill-content">
                  <p className="userskill-text">A very long skill description</p>
                  <button className="userskill-delete-btn">x</button>
                </div>

                <div className="userskill-content">
                  <p className="userskill-text">Skill 3</p>
                  <button className="userskill-delete-btn">x</button>
                </div>

                <div className="userskill-content">
                  <p className="userskill-text">Skill 3</p>
                  <button className="userskill-delete-btn">x</button>
                </div>

                <div className="userskill-content">
                  <p className="userskill-text">Another long skill description</p>
                  <button className="userskill-delete-btn">x</button>
                </div>

                <div className="userskill-content">
                  <p className="userskill-text">Skill 3</p>
                  <button className="userskill-delete-btn">x</button>
                </div>

                
                
              </div>
            </div>
            <div className="usercontact-cont">
              <p className="form-spec">Contacts</p>
              <div className="usercontact-list-cont">

                <div className="usercontact-content">
                  <p className="usercontact-text">Contact 1</p>
                  <p className="vl"></p>
                  <p className="usercontact-text">069 6969696969</p>
                  <button className="usercontact-delete-btn">x</button>
                </div>

                <div className="usercontact-content">
                <p className="usercontact-text">Email</p>
                  <p className="vl"></p>
                  <p className="usercontact-text">saygex@sexgay.com</p>
                  <button className="usercontact-delete-btn">x</button>
                </div>

                <div className="usercontact-content">
                <p className="usercontact-text">Skill 1</p>
                  <p className="vl"></p>
                  <p className="usercontact-text">Skill 1</p>
                  <button className="usercontact-delete-btn">x</button>
                </div>

                <div className="usercontact-content">
                <p className="usercontact-text">Skill 1</p>
                  <p className="vl"></p>
                  <p className="usercontact-text">Skill 1</p>
                  <button className="usercontact-delete-btn">x</button>
                </div>

              
                
                
              </div>
            </div>
            <button className="profileedit-submit-btn" type="submit">
              Save
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
