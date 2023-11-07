import React, { useState, useRef } from "react";
import Item from "./Item.jsx";
import listOfItems from "../assets/items.jsx";
// import addItem from "../functions/addItem.js";

function App() {
  const [items, setItems] = useState(listOfItems);

  const nameRef = useRef(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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
  };

  const enterPress = (e) => {
    if (e.key === "Enter") {
      addItem(name, description, items, setItems);
    }
  };

  return (
    <div>
      <h1>CampingList</h1>
      <div>
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
      <button onClick={() => addItem(name, description, items, setItems)}>
        Add Item
      </button>
    </div>
  );
}

export default App;
