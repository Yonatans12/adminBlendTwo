import React, { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
const PrivateRouting = ({ children }) => {
  const AuthData = JSON.parse(localStorage.getItem("Blendtwo_admin"));
  if (AuthData?.role === 2 && AuthData?.apikey && AuthData?.token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
export default PrivateRouting;
