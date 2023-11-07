import React, { useState } from "react";

function Item({ name, description, complete, starred }) {
  const [isComplete, setIsComplete] = useState(false);

  function handleToggle() {
    setIsComplete(!isComplete);
  }

  return (
    <div style={styles.item}>
      <input type="checkbox" checked={isComplete} onChange={handleToggle} />
      <span>{name}</span>
      {starred ? <span>⭐</span> : <span>☆</span>}
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
    marginBottom: 5,
    border: "solid 1px black",
    backgroundColor: "white",
  },
};
