import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        // Do something...
        console.log(data);
        setFound(true);
      }
    };
    // Call the handler function
    handler();
  }, []);

  return (
    <div className="profileedit-page-wrapper">
      <img className="profileedit-bg" src={background}></img>
      {found ? (
        <div className="profileedit-form-cont">
          <p className="profileedit-form-prompt">{data.name}</p>
          <hr className="profileedit-form-line"></hr>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserProfile;
