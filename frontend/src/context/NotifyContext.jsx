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

  let notify = (status, content) => {
    // Set toastify config
    let toastConfig = {
      position: "bottom-right",
      autoClose: 3800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    };

    // Change notification and notification content
    // TODO: better way to call function based on status
    setNotification(
      (notification = () => {
        switch (status) {
          case "info":
            toast.info(content, toastConfig);
            break;
          case "success":
            toast.success(content, toastConfig);
            break;
          case "warning":
            toast.warning(content, toastConfig);
            break;
          case "error":
            toast.error(content, toastConfig);
            break;
          case "default":
            toast(content, toastConfig);
        }
      })
    );
  };

  let contextData = {
    // notification related variables
    notification: notification,
    // notification related functions
    notify: notify,
  };

  return (
    <NotifyContext.Provider value={contextData}>
      {<Outlet />}
    </NotifyContext.Provider>
  );
};
