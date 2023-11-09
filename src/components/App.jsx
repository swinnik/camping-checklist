import React from "react";
import { UserProvider } from "../Contexts/UserContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import UI from "./UI.jsx";

function App() {
  return (
    <UserProvider>
      <Router>
        <UI />
      </Router>
    </UserProvider>
  );
}

export default App;
