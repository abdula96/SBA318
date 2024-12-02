const express = require("express");
const router = express.Router();
const logRequest = require("../middleware/logRequest");
const validateRecipeData = require("../middleware/validateRecipeData");

const recipes = []; // Mock database

router.use(logRequest);

// Get all recipes with optional query params for filtering
router.get("/", (req, res) => {
  const { category, ingredient } = req.query;
  let filteredRecipes = recipes;

  if (category) {
    filteredRecipes = filteredRecipes.filter((r) => r.category === category);
  }
  if (ingredient) {
    filteredRecipes = filteredRecipes.filter((r) =>
      r.ingredients.includes(ingredient)
    );
  }

  res.json(filteredRecipes);
});

// Get single recipe by ID
router.get("/:id", (req, res) => {
  const recipe = recipes[req.params.id];
  if (!recipe) {
    return res.status(404).send({ message: "Recipe not found" });
  }
  res.json(recipe);
});

// Add new recipe
router.post("/", validateRecipeData, (req, res) => {
  const { name, category, ingredients, steps } = req.body;
  const newRecipe = { name, category, ingredients, steps };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

// Update a recipe
router.patch("/:id", validateRecipeData, (req, res) => {
  const recipe = recipes[req.params.id];
  if (!recipe) {
    return res.status(404).send({ message: "Recipe not found" });
  }
  const { name, category, ingredients, steps } = req.body;
  recipe.name = name || recipe.name;
  recipe.category = category || recipe.category;
  recipe.ingredients = ingredients || recipe.ingredients;
  recipe.steps = steps || recipe.steps;

  res.json(recipe);
});

// Delete a recipe
router.delete("/:id", (req, res) => {
  const recipeIndex = recipes.findIndex((r) => r.id === req.params.id);
  if (recipeIndex === -1) {
    return res.status(404).send({ message: "Recipe not found" });
  }
  recipes.splice(recipeIndex, 1);
  res.status(204).send();
});

module.exports = router;
