import React, { createContext, useState } from "react";
import App from "../components/App.jsx";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("Sean");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
