import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Importing style
import "../../pagestyles/UserProfile.css";

// Importing assets
import userpicture from "../../assets/userplaceholder.jpg";

// Importing AuthContext
import AuthContext from "../../context/UserauthContext";

// Importing NotifyContext to get notify function
import NotifyContext from "../../context/NotifyContext";

// Importing assets
import background from "../../assets/userauthbg.webp";

const UserProfile = () => {
  // Get notify function
  let { notify } = useContext(NotifyContext);

  // Get params from url
  const { name } = useParams();

  let [data, setData] = useState("nodata");
  let [found, setFound] = useState(false);

  // Get user info
  useEffect(() => {
    // Async function inside of useEffect
    let handler = async () => {
      // Sending request
      let response = await fetch(
        "http://localhost:8000/account/viewuserinfo/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
          }),
        }
      );
      setData((data = await response.json()));

      let message = data.detail;
      if (response.status == 400)
        // Notify + Stop element from loading TODO
        notify("error", message);
      else {
        setFound(true);
      }
    };
    // Call the handler function
    handler();
  }, []);

  // Copy contact content
  let copyContact = (e, text) => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    notify("info", "Copied contact!");
  };

  return (
    <div className="viewprofile-page-wrapper">
      <img className="viewprofile-bg" src={background}></img>
      {found ? (
        <div className="viewprofile-form-cont">
          <div className="viewprofile-top-info">
            <img className="viewprofile-user-pic" src={userpicture}></img>
            <div className="viewprofile-main-info-cont">
              <p className="viewprofile-form-prompt">{data.name}</p>
              <p className="viewprofile-profession">
                {data.currentJob} - {data.currentLocation}
              </p>
            </div>
          </div>
          <hr className="viewprofile-form-line"></hr>
          <div className="viewprofile-otherinfo-cont">
            <div className="viewprofile-otherinfo-introduction-cont">
              <p className="viewprofile-otherinfo-introduction-prompt">
                Introduction
              </p>
              <p className="viewprofile-otherinfo-introduction-content">
                {data.shortDesc}
              </p>
              <div className="viewprofile-cont">
                <p className="viewprofile-form-spec">Skills</p>
                <div className="viewprofile-skill-list-cont">
                  {data.skills.map((skill) => {
                    const skillSplitted = skill.split(":");
                    return (
                      <div
                        key={skillSplitted[0]}
                        className="viewprofile-skill-content"
                      >
                        <p className="viewprofile-skill-text">
                          {skillSplitted[1]}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <p className="viewprofile-form-spec">Contacts</p>
                <div className="viewprofile-contact-list-cont">
                  {data.contacts.map((contact) => {
                    const contactSplitted = contact.split(":");
                    return (
                      <div
                        key={contactSplitted[0]}
                        className="viewprofile-contact-content"
                      >
                        <p className="viewprofile-contact-text">
                          {contactSplitted[1]}
                        </p>
                        <p className="vl"></p>
                        <button
                          type="button"
                          className="viewprofile-usercontact-text-btn"
                          onClick={(e) => {
                            copyContact(e, contactSplitted[2]);
                          }}
                        >
                          {contactSplitted[2]}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserProfile;
