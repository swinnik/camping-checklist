const addItem = (name, description, items, setItems) => {
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
export default addItem;
