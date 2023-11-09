import React, { useState, useRef } from "react";

const Inputs = ({ items, setItems, addItem, nameRef }) => {
  // const nameRef = useRef(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const enterPress = (e) => {
    if (e.key === "Enter") {
      console.log(items);
      console.log(name, description, items, setItems);
      addItem(name, description, items, setItems);
      setName("");
    }
  };

  return (
    <>
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
    </>
  );
};

const style = {
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
};

export default Inputs;
