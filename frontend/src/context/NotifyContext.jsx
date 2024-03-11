import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// Importing toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create notification context
const NotifyContext = createContext();

export default NotifyContext;

export const NotifyProvider = () => {
  // Context contents
  let [notification, setNotification] = useState();

  let [notifContent, setNotifContent] = useState();

  let notify = (status, content) => {
    // Do something
    console.log("status is: ", status);
    console.log("content is:", content);

    // Change notification and notification content
    setNotification(
      (notification = () => {
        return (
          <ToastContainer
            position="bottom-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="light"
            transition:Slide
          />
        );
      })
    );

    setNotifContent((notifContent = content));
  };

  let contextData = {
    // notification related variables
    notification: notification,
    notifContent: notifContent,
    // notification related functions
    notify: notify,
  };

  return (
    // If loading is true, render nothing, else render everything as normal
    // TODO add loading ***
    <NotifyContext.Provider value={contextData}>
      {<Outlet />}
    </NotifyContext.Provider>
  );
};
