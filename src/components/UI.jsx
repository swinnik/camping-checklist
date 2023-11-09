import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import Item from "./Item.jsx";
import listOfItems from "../assets/items.jsx";
import Inputs from "./Inputs.jsx";
import { UserContext } from "../Contexts/UserContext.jsx";

function UI() {
  //using Fetch, retrieve the items from ther server
  const [items, setItems] = useState([]);
  const { user, setUser } = useContext(UserContext);

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

  // async function updateStar(e) {
  //   const name = e.target.parentElement.parentElement.children[1].innerText;
  //   console.log(name);

  //   axios
  //     .patch(`/items/${name}/starred`)
  //     .then((response) => {
  //       console.log("response from axios patch request", response);
  //     })
  //     .catch((err) => {
  //       console.log("error in axios patch request", err);
  //     });

  //   setItems((oldItems) => {
  //     return oldItems.map((item) => {
  //       if (item.name === name) {
  //         return { ...item, starred: !item.starred };
  //       }
  //       return item;
  //     });
  //   });
  // }

  const enterPress = (e) => {
    if (e.key === "Enter") {
      addItem(name, description, items, setItems);
    }
  };

  const inputProps = {
    items,
    setItems,
    addItem,
    enterPress,
  };

  return (
    <div>
      <h1 style={style.header}>CampingList</h1>
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
