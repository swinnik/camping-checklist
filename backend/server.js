const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config();

//import items array from ../src/assets/items.js
const items = require("../src/assets/items.jsx");
const categories = require("../src/assets/categories.jsx");

// Middleware
// app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../dist")));

// In-memory data store

// Create list item

app.post("/items", (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

//rewrite .getItems to utilize query params like this: http://localhost:3000/?userName=Bob
//if no  params, return all items
app.get("/items", (req, res) => {
  const userName = req.query.userName;
  if (userName) {
    const userItems = items.filter((item) => item.userName === userName);
    res.json(userItems);
  } else {
    res.json(items);
  }
});

// app.get("/items", (req, res) => {
//   res.json(items);
// });

app.get("/items/:name", (req, res) => {
  const name = req.params.name;
  const item = items.find((item) => item.name === name);
  if (!item) {
    res.sendStatus(404);
  } else {
    res.json(item);
  }
});

app.get("/items/:name/description", (req, res) => {
  const name = req.params.name;
  const item = items.find((item) => item.name === name);
  if (!item) {
    res.sendStatus(404);
  } else {
    res.json(item.description);
  }
});

// Delete list item
app.delete("/items/:id", (req, res) => {
  const id = req.params.id;
  items = items.filter((item) => item.id !== id);
  res.sendStatus(204);
});

// Check list item as complete
app.patch("/items/:id/complete", (req, res) => {
  const id = req.params.id;
  const item = items.find((item) => item.id === id);
  if (!item) {
    res.sendStatus(404);
  } else {
    item.completed = true;
    res.json(item);
  }
});

app.post("/items/uncheck/", (req, res) => {
  console.log("UNCHECK", items);
  items.forEach((item) => {
    item.complete = false;
  });
  res.json(items);
});

app.patch("/items/:name/starred", (req, res) => {
  const name = req.params.name;
  console.log(name);
  const item = items.find((item) => item.name === name);
  if (!item) {
    res.sendStatus(404);
  } else {
    item.starred = !item.starred;
    res.json(item);
  }
});

// Toggle 'complete' on one item
app.put("/items/:name/complete", (req, res) => {
  const name = req.params.name;
  console.log(name);
  const item = items.find((item) => item.name === name);
  if (!item) {
    res.sendStatus(404);
  } else {
    item.complete = !item.complete;
    res.json(item);
  }
});

//write an endpoint to get all categories
app.get("/categories", (req, res) => {
  // console.log(categories);
  res.json(categories);
});

app.post("/categories", (req, res) => {
  const newCategory = req.body;
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
