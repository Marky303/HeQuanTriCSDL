import { createContext, useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

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

  let [fetching, setFetching] = useState(false);

  let [loading, setLoading] = useState(true);

  let navigate = useNavigate();

  let location = useLocation();

  // Creating login function as a context to pass it to login page
  let loginUser = async (e) => {
    // PREVENT PAGE RELOAD ON FORM SUBMIT SOMEHOW IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT
    // IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT
    e.preventDefault();

    // Setting login to true
    setFetching((fetching = true));

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

    // Setting login to false
    setFetching((fetching = false));

    if (response.status == 200) {
      setauthTokens(data);
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/dash");
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

    setFetching((fetching = true));

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

    setFetching((fetching = false));

    if (response.status == 201) {
      // TODO better signup redirection
      alert(
        "User created successfully, please check your email for account activation"
      );
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

  // Activate user
  let activateUser = async (uid, token) => {
    let response = await fetch("http://localhost:8000/auth/users/activation/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Set fields to send
      body: JSON.stringify({
        uid: uid,
        token: token,
      }),
    });
  };

  // Getting refreshed token (...yes, pass it to whatever page)
  let updateToken = async () => {
    // Posting to server and get response
    let response = await fetch("http://localhost:8000/auth/jwt/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });
    let data = await response.json();
    // If refresh successfully
    if (response.status === 200) {
      // Setting (and decoding) token info for variables
      setauthTokens(data);
      localStorage.setItem("authTokens", JSON.stringify(data));
    }
    // If refresh unsuccessfully
    else {
      logoutUser();
    }
    if (loading) {
      setLoading(false);
    }
  };

  // Request a reset password confirmation email
  let sendResetRequest = async (e) => {
    e.preventDefault();

    // Posting to server and get response
    let response = await fetch(
      "http://localhost:8000/auth/users/reset_password/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Set email to send
        body: JSON.stringify({
          email: e.target.email.value,
        }),
      }
    );
    if (response.status == 204) {
      alert("Password reset email has been sent!");
    } else {
      alert("Cannot find email");
    }
  };

  let resetPassword = async (e) => {
    e.preventDefault();

    let acceptable = true;

    if (e.target.password.value.length <= 6) {
      acceptable = false;
    }
    if (e.target.password.value != e.target.repassword.value) {
      acceptable = false;
    }

    // Check if 2 fields are the same because Djoser doesnt check this somehow
    if (acceptable) {
      // Posting to server and get response
      let response = await fetch(
        "http://localhost:8000/auth/users/reset_password_confirm/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Set fields to send
          body: JSON.stringify({
            uid: e.target.uid.value,
            token: e.target.token.value,
            new_password: e.target.password.value,
            re_new_password: e.target.repassword.value,
          }),
        }
      );
      if (response.status == 204) {
        alert("Password reset successfully!");
        navigate("/login");
      } else {
        alert("Something went wrong");
      }
    } else {
      alert("New password criteria isn't met!");
    }
  };

  // Declaring context data to pass to other components
  let contextData = {
    // userauth related variables
    authTokens: authTokens,
    fetching: fetching,

    // userauth related functions
    loginUser: loginUser,
    logoutUser: logoutUser,
    signupUser: signupUser,
    activateUser: activateUser,
    updateToken: updateToken,
    sendResetRequest: sendResetRequest,
    resetPassword: resetPassword,
  };

  useEffect(() => {
    // Url regexs that needs token updating
    let dashRegex = /dash/g;

    // Check if this route need token updating
    if (dashRegex.test(location.pathname)) {
      if (loading) {
        // Check if the user is loading into page(refresh the token everytime the user open the page)
        updateToken();
      }
      // updateToken will be called every 10 minutes
      let tenMinutes = 1000 * 60 * 10 - 1;
      // Declare interval id as "interval" then clear it at the end in order not to multiply (1,2,4,8,16,...)
      let interval = setInterval(() => {
        if (authTokens) {
          updateToken();
        }
      }, tenMinutes);
      // Clearing interval
      return () => clearInterval(interval);
    }
  }, [authTokens, loading, location]);

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
