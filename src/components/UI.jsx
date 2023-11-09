import React, { useState, useRef, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Item from "./Item.jsx";
import UserSingup from "./SignIn.jsx";
import listOfItems from "../assets/items.jsx";
import Inputs from "./Inputs.jsx";
import { UserContext } from "../Contexts/UserContext.jsx";

function UI() {
  //using Fetch, retrieve the items from ther server
  const [items, setItems] = useState([]);
  const { user, setUser } = useContext(UserContext);

  const location = useLocation();
  const [paramValue, setParamValue] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paramValue = params.get("name");
    setParamValue(paramValue);
  }, [location]);

  useEffect(() => {
    fetch("/items")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        console.log(data);
      })
      .catch((err) => {
        console.log("error in fetch get request", err);
      });
  }, []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function addItem(name, description, items) {
    if (name === "") {
      nameRef.current.focus();
      return;
    }
    const newItem = {
      name: name,
      description: description,
      complete: false,
      starred: false,
    };
    setItems([...items, newItem]);
    axios
      .post("/items", newItem)
      .then((response) => {
        console.log("response from axios post request", response);
      })
      .catch((err) => {
        console.log("error in axios post request", err);
      });

    setName("");
    setDescription("");
    nameRef.current.focus();
  }

  const enterPress = (e) => {
    if (e.key === "Enter") {
      SignIn();
    }
  };

  const inputProps = {
    items,
    setItems,
    addItem,
    enterPress,
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
    <div>
      <h1 style={style.header}>CampingList</h1>
      <UserSingup seUser={setUser} user={user} />
      <div style={style.list}>
        {items.map((item) => (
          <Item
            key={item.name}
            name={item.name}
            description={item.description}
            complete={item.complete}
            starred={item.starred}
            setItems={setItems}
            // updateStar={updateStar}
          />
        ))}
      </div>
      {items != [] && <Inputs {...inputProps} />}
    </div>
  );
}

const style = {
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "2em",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "1em",
    width: "34em",
    // border: "solid 1px black",
    backgroundColor: "lightgray",
    margin: "auto",
    marginBottom: "1em",
    borderRadius: "1em",
  },
  header: {
    border: "1px solid black",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "forestGreen",
    padding: "1em",
    borderRadius: "1em",
  },
};

export default UI;
