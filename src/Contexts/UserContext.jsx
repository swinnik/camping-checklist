import React, { createContext, useEffect, useState } from "react";
import App from "../components/App.jsx";
import Axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  //write a utilize to receive the userName query parameter rom the url
  //and return the value
  const getUserName = () => {
    const params = new URLSearchParams(location.search);
    const paramValue = params.get("userName");
    return paramValue;
  };
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(getUserName());
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
