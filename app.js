const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Middleware for parsing incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// Global error handler (optional improvement)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
