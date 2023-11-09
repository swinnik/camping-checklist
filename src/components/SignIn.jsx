import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext.jsx";
import { useLocation } from "react-router-dom";

const UserSignup = () => {
  const { user, setUser } = useContext(UserContext);

  const location = useLocation();
  const [paramValue, setParamValue] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paramValue = params.get("name");
    setParamValue(paramValue);
  }, [location]);

  const enterPress = (e) => {
    if (e.key === "Enter") {
      SignIn();
    }
  };

  const [userName, setUserName] = useState("");

  const SignIn = () => {
    if (userName) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("userName", userName);
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?${searchParams.toString()}`
      );
      setUser(userName);
    }
  };

  const LogOut = () => {
    //please implement a way to remove the userName search parameter from the url
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("userName");
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${searchParams.toString()}`
    );
    setUser("");
  };

  return (
    <>
      {user ? (
        <>
          <div>{user}</div>
          <button onClick={() => LogOut()}>Log Out</button>
        </>
      ) : (
        <div>
          <input
            type="text"
            placeholder="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={(e) => enterPress(e)}
          />
          <button onClick={SignIn}>Log In</button>
        </div>
      )}
    </>
  );
};

export default UserSignup;

/* {user ? (
  <>
    <div>{user}</div>
    <button onClick={() => LogOut()}>Log Out</button>
  </>
) : (
  <div>
    <input
      type="text"
      placeholder="username"
      value={userName}
      onChange={(e) => setUserName(e.target.value)}
      onKeyDown={(e) => enterPress(e)}
    />
    <button onClick={SignIn}>Log In</button>
  </div>
)} */
