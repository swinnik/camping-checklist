const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config();

// Middleware
// app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../dist")));

// In-memory data store
let items = [];

// Create list item
app.post("/items", (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
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

// Uncheck all list items as incomplete
app.patch("/items/incomplete", (req, res) => {
  items.forEach((item) => {
    item.completed = false;
  });
  res.json(items);
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
