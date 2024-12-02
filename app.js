const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const port = 3000;

// Middleware for parsing incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Allow overriding HTTP methods using _method query param (needed for DELETE)
app.use(methodOverride("_method"));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Sample in-memory data for recipes (starting with 2 recipes)
let recipes = [
  {
    id: 1,
    name: "Spaghetti",
    ingredients: "Pasta, Sauce",
    instructions: "Cook pasta, add sauce",
  },
  {
    id: 2,
    name: "Salad",
    ingredients: "Lettuce, Tomato, Cucumber",
    instructions: "Chop and mix",
  },
];

// Home route - list all recipes
app.get("/", (req, res) => {
  res.render("index", { recipes });
});

// Add recipe route - form to add a new recipe
app.get("/add", (req, res) => {
  res.render("addrecipe");
});

// Handle form submission to add a recipe
app.post("/add", (req, res) => {
  const { recipeName, ingredients, instructions } = req.body;
  const newRecipe = {
    id: recipes.length + 1, // Automatically increment the ID
    name: recipeName,
    ingredients,
    instructions,
  };
  recipes.push(newRecipe); // Add the new recipe to the array
  res.redirect("/"); // Redirect back to the homepage to see the updated list
});

// Handle deletion of a recipe
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  recipes = recipes.filter((recipe) => recipe.id !== parseInt(id)); // Remove recipe by ID
  res.redirect("/"); // Redirect to homepage after deletion
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
