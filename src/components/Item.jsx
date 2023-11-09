import React, { useState } from "react";
import Axios from "axios";

function Item({ name, description, complete, starred, updateStar, setItems }) {
  const [isComplete, setIsComplete] = useState(complete);

  function handleToggle() {
    setIsComplete(!isComplete);
  }

  async function updateStar(e) {
    const name = e.target.parentElement.parentElement.children[1].innerText;
    console.log(name);
    Axios.patch(`/items/${name}/starred`)
      .then((response) => {
        console.log("response from axios patch request", response);
      })
      .catch((err) => {
        console.log("error in axios patch request", err);
      });

    setItems((oldItems) => {
      return oldItems.map((item) => {
        if (item.name === name) {
          return { ...item, starred: !item.starred };
        }
        return item;
      });
    });
  }

  async function updateComplete(e) {
    console.log(name);
    Axios.put(`/items/${name}/complete`)
      .then((response) => {
        console.log("response from axios put request", response);
      })
      .catch((err) => {
        console.log("error in axios put request", err);
      });

    // setItems((oldItems) => {
    //   return oldItems.map((item) => {
    //     if (item.name === name) {
    //       return { ...item, complete: !item.complete };
    //     }
    //     return item;
    //   });
    // });
    setIsComplete((oldComplete) => {
      return !oldComplete;
    });
  }

  const sayName = () => {
    console.log(name);
  };

  return (
    <div style={styles.item}>
      <input
        type="checkbox"
        checked={isComplete}
        onChange={(e) => updateComplete(e)}
      />
      <span>{name}</span>
      <div onClick={(e) => updateStar(e)} style={styles.star}>
        {starred ? <span>⭐</span> : <span>☆</span>}
      </div>
    </div>
  );
}

export default Item;

const styles = {
  item: {
    width: "15em",
    height: "2em",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "solid 1px black",
    backgroundColor: "white",
    padding: ".5em",
  },
  star: {
    cursor: "pointer",
    width: "1em",
  },
};
