import { useContext, createContext, useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

// Importing NotifyContext to get notify function
import NotifyContext from "./NotifyContext";

// Create a new context
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = () => {
  // Get notify function
  let { notify } = useContext(NotifyContext);

  // Get and set authTokens variable if it is saved in localStorage
  // Preventing logging out when reloading page
  let [authTokens, setauthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  let [userInfo, setuserInfo] = useState(() =>
    localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
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

    // Setting loading to true
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

    // Setting loading to false
    setFetching((fetching = false));

    if (response.status == 200) {
      setauthTokens(data);
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");

      // Get user information after logging in
      getUserinfo(true);
    }
    // Notify if login unsuccessful
    else {
      let message = data.detail
        ? data.detail
        : data.email
        ? "Email field cannot be blank"
        : "Password field cannot be blank";
      notify("error", message);
    }
  };

  // Get user information
  let getUserinfo = async (isLogin) => {
    // Getting user info
    let response = await fetch("http://localhost:8000/account/getuserinfo/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Something is wrong here
        Authorization:
          "Bearer " +
          String(JSON.parse(localStorage.getItem("authTokens")).access),
      },
    });
    let data = await response.json();
    // Save user information
    if (response.status == 200) {
      setuserInfo(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      // Display welcome back notification
      if (isLogin) {
        let welcomeMsg = "Welcome back, " + data.name;
        notify("success", welcomeMsg);
      }
    } else {
      // Logout if cannot get user information
      notify("error", "Something went wrong. Please login again.");
    }
  };

  // Creating signup function to pass it to signup page
  let signupUser = async (e) => {
    e.preventDefault();

    // Check for blank fields
    if (
      !(
        e.target.email.value &&
        e.target.username.value &&
        e.target.password.value &&
        e.target.repassword.value
      )
    ) {
      notify("warning", "Field(s) may not be blank!");
      return;
    }

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
      notify("success", "User created successfully, please check your email.");
      navigate("/login");
    }
    // Notify if signup unsuccessful
    else {
      let message = data.name
        ? data.name[0]
        : data.email
        ? data.email[0]
        : data.password
        ? data.password[0]
        : data.re_password
        ? data.re_password[0]
        : data.non_field_errors[0];
      notify("error", message);
    }
  };

  // Creating logout function to pass it to logout button
  let logoutUser = () => {
    setauthTokens(null);
    setuserInfo(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("userInfo");
    notify("warning", "Logged out.");
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
      // getUserInfo is causing the funny here
      getUserinfo(false);
    }
    // If refresh unsuccessfully
    else {
      logoutUser();
      notify("error", "Something happened, please log in.");
    }
    if (loading) {
      setLoading(false);
    }
  };

  // Request a reset password confirmation email
  let sendResetRequest = async (e) => {
    e.preventDefault();

    setFetching((fetching = true));

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

    setFetching((fetching = false));

    if (response.status == 204) {
      notify("success", "Password reset request has been sent!");
    } else {
      notify("error", "Cannot find specified email!");
    }
  };

  let resetPassword = async (e) => {
    e.preventDefault();

    setFetching((fetching = true));

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
        notify("success", "Password has been changed.");
        navigate("/login");
      } else {
        notify("error", "Cannot change password, please retry!");
      }
    } else {
      notify("warning", "New password criteria isn't met!");
    }

    setFetching((fetching = false));
  };

  let updateUserInfo = async (e) => {
    // Set fetching to true
    setFetching((fetching = true));

    // Sending update request
    let response = await fetch(
      "http://localhost:8000/account/updateuserinfo/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Something is wrong here
          Authorization:
            "Bearer " +
            String(JSON.parse(localStorage.getItem("authTokens")).access),
        },
        body: JSON.stringify({
          email: e.target.email.value,
          name: e.target.name.value,
          currentJob: e.target.currentJob.value,
          currentLocation: e.target.currentLocation.value,
          shortDesc: e.target.shortDesc.value,
        }),
      }
    );
    let data = await response.json();

    // Set fetching to false
    setFetching((fetching = false));

    let message = data.detail;
    let notifType = response.status == 202 ? "success" : "error";
    if (response.status == 202)
      // Get new user info on successful response/edit
      getUserinfo(false);
    notify(notifType, message);
  };

  let addUserskill = async (skill) => {
    // Set fetching to true
    setFetching((fetching = true));

    // Sending adding skill request
    let response = await fetch("http://localhost:8000/account/adduserskill/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Something is wrong here
        Authorization:
          "Bearer " +
          String(JSON.parse(localStorage.getItem("authTokens")).access),
      },
      body: JSON.stringify({
        skill: skill,
      }),
    });
    let data = await response.json();

    // Set fetching to false
    setFetching((fetching = false));

    let message = data.detail;
    let notifType = response.status == 202 ? "success" : "error";
    if (response.status == 202)
      // Get new user info on successful response/edit
      getUserinfo(false);
    notify(notifType, message);
  };

  let deleteUsertag = async (id, type) => {
    // Set fetching to true
    setFetching((fetching = true));

    // Change the link accordingly
    let link = "http://localhost:8000/account/deleteuser" + type;
    console.log(link)

    // Sending adding skill request
    let response = await fetch(link, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Something is wrong here
        Authorization:
          "Bearer " +
          String(JSON.parse(localStorage.getItem("authTokens")).access),
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    let data = await response.json();

    // Set fetching to false
    setFetching((fetching = false));

    let message = data.detail;
    let notifType = response.status == 202 ? "success" : "error";
    if (response.status == 202)
      // Get new user info on successful response/edit
      getUserinfo(false);
    notify(notifType, message);
  };

  let addUsercontact = async (contactType, contactContent) => {
    // Set fetching to true
    setFetching((fetching = true));

    // Sending adding skill request
    let response = await fetch(
      "http://localhost:8000/account/addusercontact/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Something is wrong here
          Authorization:
            "Bearer " +
            String(JSON.parse(localStorage.getItem("authTokens")).access),
        },
        body: JSON.stringify({
          contactType: contactType,
          contactContent: contactContent,
        }),
      }
    );
    let data = await response.json();

    // Set fetching to false
    setFetching((fetching = false));

    let message = data.detail;
    let notifType = response.status == 202 ? "success" : "error";
    if (response.status == 202)
      // Get new user info on successful response/edit
      getUserinfo(false);
    notify(notifType, message);
  };

  // Declaring context data to pass to other components
  let contextData = {
    // userauth related variables
    authTokens: authTokens,
    userInfo: userInfo,
    fetching: fetching,

    // userauth related functions
    loginUser: loginUser,
    logoutUser: logoutUser,
    signupUser: signupUser,
    activateUser: activateUser,
    updateToken: updateToken,
    sendResetRequest: sendResetRequest,
    resetPassword: resetPassword,
    updateUserInfo: updateUserInfo,
    addUserskill: addUserskill,
    addUsercontact: addUsercontact,
    deleteUsertag: deleteUsertag,
  };

  useEffect(() => {
    // Url regexs that does NOT token updating
    // TODO: find a better way to implement this
    let loginRegex = /login/g;
    let signupRegex = /signup/g;
    let passwordRegex = /password/g;
    let activateRegex = /activate/g;
    let openingRegex = /home/g;
    let contactsRegex = /contacts/g;
    let learnRegex = /learn/g;
    let productsRegex = /products/g;

    // Check if this route need token updating
    if (
      !(
        loginRegex.test(location.pathname) ||
        signupRegex.test(location.pathname) ||
        passwordRegex.test(location.pathname) ||
        activateRegex.test(location.pathname) ||
        openingRegex.test(location.pathname) ||
        contactsRegex.test(location.pathname) ||
        learnRegex.test(location.pathname) ||
        productsRegex.test(location.pathname)
      )
    ) {
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
    <AuthContext.Provider value={contextData}>
      {<Outlet />}
    </AuthContext.Provider>
  );
};
