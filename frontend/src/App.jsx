import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing provider to "provide" information to all components in the application
import { AuthProvider } from "./context/UserauthContext";

// AuthContext calls function from NotifyContext -> NotifyProvider wraps AuthProvider
import { NotifyProvider } from "./context/NotifyContext";

// Importing introduction related pages
import Opening from "./pages/home/Opening";
import Contacts from "./pages/home/Contacts";
import Learn from "./pages/home/Learn";
import Products from "./pages/home/Products";

// Importing main page (private route)
import Home from "./pages/Home";

// Importing profile related pages
import ProfileEdit from "./pages/userprofile/ProfileEdit";

// Importing userath related pages
import Login from "./pages/userauth/Login";
import Signup from "./pages/userauth/Signup";
import Activate from "./pages/userauth/Activate";
import ResetPassword from "./pages/userauth/ResetPassword";
import ResetPasswordConfirm from "./pages/userauth/ResetPasswordConfirm";

// Importing 404 page
import PageNotFound from "./pages/error/PageNotFound";

// Layout for website
import Layout from "./hocs/Layout.jsx";

// Include/setup all pages in application wrapper/router
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<NotifyProvider />}>
        <Route exact path="/" element={<AuthProvider />}>
          <Route path="/" element={<Layout />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/profileedit" element={<ProfileEdit />} />

            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/activate/:uid/:token" element={<Activate />} />
            <Route exact path="/resetpassword" element={<ResetPassword />} />
            <Route
              exact
              path="/password/reset/confirm/:uid/:token"
              element={<ResetPasswordConfirm />}
            />

            <Route exact path="/home" element={<Opening />} />
            <Route exact path="/contacts" element={<Contacts />} />
            <Route exact path="/learn" element={<Learn />} />
            <Route exact path="/products" element={<Products />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
