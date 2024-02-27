import { createContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; // useHistory is replaced by use navigate
import axios from "axios";

// Create a new context
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = () => {
  // Get and set authTokens variable if it is saved in localStorage
  // Preventing logging out when reloading page
  let [authTokens, setauthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  let [loading, setLoading] = useState(true);

  let navigate = useNavigate();

  // Creating login function as a context to pass it to login page
  let loginUser = async (e) => {
    // PREVENT PAGE RELOAD ON FORM SUBMIT SOMEHOW IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT
    // IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT
    e.preventDefault();

    // Posting to server and get response
    let response = await fetch("http://localhost:8000/auth/jwt/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Set username and password to send
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();

    if (response.status == 200) {
      setauthTokens(data);
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    }
    // Notify if login unsuccessful
    else {
      // TODO better notification
      let detail = JSON.stringify(data);
      alert(detail);
    }
  };

  // Creating signup function to pass it to signup page
  let signupUser = async (e) => {
    e.preventDefault();

    // Posting to server and get response
    let response = await fetch("http://localhost:8000/auth/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Set fields to send
      body: JSON.stringify({
        email: e.target.email.value,
        name: e.target.username.value,
        password: e.target.password.value,
        re_password: e.target.repassword.value,
      }),
    });
    let data = await response.json();

    if (response.status == 201) {
      // TODO better signup redirection
      alert("User created successfully, please check your email for account activation")
      navigate("/login");
    }
    // Notify if signup unsuccessful
    else {
      // TODO better notification
      let detail = JSON.stringify(data);
      alert(detail);
    }
  };

  // Creating logout function to pass it to logout button
  let logoutUser = () => {
    setauthTokens(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  // Getting refreshed token (...yes, pass it to whatever page)
  let updateToken = async () => {};

  // Declaring context data to pass to other components
  let contextData = {
    // userauth related variables
    authTokens: authTokens,

    // userauth related functions
    loginUser: loginUser,
    logoutUser: logoutUser,
    signupUser: signupUser,
  };

  // Passing your context data here (including arguments/functions)
  // Nested elements are rendered using <Outlet /> tag (using nested routers)
  return (
    // If loading is true, render nothing, else render everything as normal
    // TODO add loading ***
    <AuthContext.Provider value={contextData}>
      {<Outlet />}
    </AuthContext.Provider>
  );
};
