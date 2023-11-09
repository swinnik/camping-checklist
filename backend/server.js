const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config();

//import items array from ../src/assets/items.js
const items = require("../src/assets/items.jsx");

// Middleware
// app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../dist")));

// In-memory data store
// let items = [];

// Create list item
app.post("/items", (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

app.get("/items", (req, res) => {
  res.json(items);
});

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
// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
