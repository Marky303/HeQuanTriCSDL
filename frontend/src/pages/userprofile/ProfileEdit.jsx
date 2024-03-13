import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

// Importing style
import "../../pagestyles/ProfileEdit.css";

// Importing assets
import background from "../../assets/userauthbg.webp";

// Importing AuthContext (profileedit function) for profileedit page
import AuthContext from "../../context/UserauthContext";

// Importing NotifyContext to get notify function
import NotifyContext from "../../context/NotifyContext";

const ProfileEdit = () => {
  // Get notify function
  let { notify } = useContext(NotifyContext);

  // Getting user/userauth info
  let { authTokens } = useContext(AuthContext);
  let { userInfo } = useContext(AuthContext);

  // Get fetching
  let { fetching } = useContext(AuthContext);
  useEffect(() => {
    let element = document.getElementsByClassName("form-disabled");
    if (fetching) element[0].setAttribute("disabled", "disabled");
    else element[0].removeAttribute("disabled");
  }, [fetching]);

  // Get update function
  let { updateUserInfo } = useContext(AuthContext);

  // Updating text fields
  useEffect(() => {
    let element;
    const textFieldList = [
      "email",
      "name",
      "currentJob",
      "currentLocation",
      "shortDesc",
    ];
    for (let i of textFieldList) {
      element = document.getElementsByName(i)[0];
      element.setAttribute("value", userInfo[i]);
    }
  }, []);

  // Copy contact content
  let copyContact = (e, text) => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    notify("info", "Copied contact!");
  };

  // Form submit handler/wrapper
  let handleSubmit = (e) => {
    // Delete this TEST line
    e.preventDefault();
    // Call update user info function
    updateUserInfo(e);
  };

  // Handle skill adding
  let { addUserskill } = useContext(AuthContext);
  let displaySkillPopup = (e) => {
    let skill = prompt("Please enter your skill:");
    if (skill == null || skill == "") {
      notify("warning", "Cancelled adding skill");
    } else {
      addUserskill(skill);
    }
  };

  // Handle skill deleting
  let { deleteUsertag } = useContext(AuthContext);
  let deleteTagHandler = (id, type) => {
    deleteUsertag(id, type);
  };

  // Handle contact adding
  let { addUsercontact } = useContext(AuthContext);
  let displayContactPopup = (e) => {
    let contactType = prompt("Please enter your contact type:");
    if (contactType == null || contactType == "") {
      notify("warning", "Cancelled adding contact");
      return;
    }
    let contactContent = prompt("Please enter your contact info:");
    if (contactContent == null || contactContent == "") {
      notify("warning", "Cancelled adding contact");
    } else {
      addUsercontact(contactType, contactContent);
    }
  };

  // Private route implemented
  return authTokens ? (
    <div className="profileedit-page-wrapper">
      <img className="profileedit-bg" src={background}></img>
      <div className="profileedit-form-cont">
        <p className="profileedit-form-prompt">User settings</p>
        <hr className="profileedit-form-line"></hr>
        <form className="profileedit-form" onSubmit={(e) => handleSubmit(e)}>
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
                {userInfo.skills.map((skill) => {
                  const skillSplitted = skill.split(":");
                  return (
                    <div key={skillSplitted[0]} className="userskill-content">
                      <p className="userskill-text">{skillSplitted[1]}</p>
                      <button
                        onClick={() =>
                          deleteTagHandler(skillSplitted[0], "skill/")
                        }
                        className="userskill-delete-btn"
                        type="button"
                      >
                        x
                      </button>
                    </div>
                  );
                })}
                <button
                  className="add-skillcontact-btn"
                  type="button"
                  onClick={() => displaySkillPopup()}
                >
                  +
                </button>
              </div>
            </div>
            <div className="usercontact-cont">
              <p className="form-spec">Contacts</p>
              <div className="usercontact-list-cont">
                {userInfo.contacts.map((contact) => {
                  const contactSplitted = contact.split(":");
                  return (
                    <div
                      key={contactSplitted[0]}
                      className="usercontact-content"
                    >
                      <p className="usercontact-text">{contactSplitted[1]}</p>
                      <p className="vl"></p>
                      <button
                        className="usercontact-text-btn"
                        onClick={(e) => {
                          copyContact(e, contactSplitted[2]);
                        }}
                      >
                        {contactSplitted[2]}
                      </button>
                      <button
                        onClick={() =>
                          deleteTagHandler(contactSplitted[0], "contact/")
                        }
                        className="usercontact-delete-btn"
                        type="button"
                      >
                        x
                      </button>
                    </div>
                  );
                })}
                <button
                  onClick={() => displayContactPopup()}
                  className="add-skillcontact-btn"
                  type="button"
                >
                  +
                </button>
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
