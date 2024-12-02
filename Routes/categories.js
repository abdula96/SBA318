const express = require("express");
const router = express.Router();

const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"]; // Mock database

// Get all categories
router.get("/", (req, res) => {
  res.json(categories);
});

// Add a new category
router.post("/", (req, res) => {
  const { category } = req.body;
  if (!category) {
    return res.status(400).send({ message: "Category is required" });
  }
  categories.push(category);
  res.status(201).json({ category });
});

module.exports = router;
