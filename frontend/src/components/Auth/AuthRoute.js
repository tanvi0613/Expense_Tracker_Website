// import React from "react";
// import { Navigate } from "react-router-dom";
// import { getUserFromStorage } from "../../utils/getUserFromStorage";

// const AuthRoute = ({ children }) => {
//   //get the token
//   const token = getUserFromStorage();

//   if (token) {
//     return children;
//   } else {
//     return <Navigate to="/login" />;
//   }
// };

// export default AuthRoute;


import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
};

export default AuthRoute;

