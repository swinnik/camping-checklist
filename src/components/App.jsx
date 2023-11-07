import React, { useState, useRef, useEffect } from "react";
import Item from "./Item.jsx";
import listOfItems from "../assets/items.jsx";
// import addItem from "../functions/addItem.js";

function App() {
  const [items, setItems] = useState(listOfItems);

  const nameRef = useRef(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const addItem = (name, description, items, setItems) => {
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
    setName("");
    setDescription("");
    nameRef.current.focus();
  };

  const enterPress = (e) => {
    if (e.key === "Enter") {
      addItem(name, description, items, setItems);
    }
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
          />
        ))}
      </div>
      <div style={style.inputs}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => enterPress(e)}
          ref={nameRef}
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => enterPress(e)}
        ></input>
        <button
          style={style.addButtom}
          onClick={() => addItem(name, description, items, setItems)}
        >
          Add Item
        </button>
      </div>
    </div>
  );
}

const style = {
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "1em",
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
  inputs: {
    border: "solid 1px black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: "1em",
    padding: "1em",
    width: "fit-content",
    margin: "auto",
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

export default App;
