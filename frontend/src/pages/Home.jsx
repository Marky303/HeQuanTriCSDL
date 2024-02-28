import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";

// Importing authContext to get tokens
import AuthContext from "../context/UserauthContext";

const Home = () => {
  // Implement if authorized
  let { authTokens } = useContext(AuthContext);

  let [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes()
  }, []);

  let getNotes = async () => {
    let response = await fetch("http://localhost:8000/notes/getNotes/", {
      method: "GET",
      header: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    setNotes(data);
  };

  // Private route implemented TODO
  return authTokens ? (
    <div className="home-page-cont">
      <p> This is the home page </p>
      <p> {JSON.stringify(notes)} </p>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Home;
