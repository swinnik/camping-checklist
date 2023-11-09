import React from "react";
import { UserProvider } from "../Contexts/UserContext.jsx";
import UI from "./UI.jsx";

function App() {
  return (
    <UserProvider>
      <UI />
    </UserProvider>
  );
}

export default App;
