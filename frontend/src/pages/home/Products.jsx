import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

// Importing AuthContext (login function) for login page
import AuthContext from "../../context/UserauthContext";

const Products = () => {
  let { authTokens } = useContext(AuthContext);

  // Reverse private route
  return authTokens ? (
    <Navigate to="/" />
  ) : (
    <div>This is the products page!</div>
  );
};

export default Products;