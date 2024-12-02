# SBA318

# Recipe Book Web Application

This is a simple web application that allows users to add, view, and delete recipes. It provides an interface for submitting recipes, including their ingredients and instructions, and stores them temporarily in memory (mock database). The application is built using Node.js, Express, EJS, and basic CSS for styling.

## Features

- Add a new recipe with a name, ingredients, and instructions.
- View all existing recipes.
- Delete a recipe.
- Categorize recipes (Basic feature can be extended).

## Tech Stack

- **Backend:** Node.js with Express
- **Frontend:** EJS for templating, CSS for styling
- **Styling:** Simple CSS with a focus on layout and responsiveness

## Project Structure

### Middleware

- **`validateRecipeData.js`**: Ensures that recipe data contains a name, ingredients, and steps before saving.
- **`logRequest.js`**: Logs HTTP request methods and URLs for debugging purposes.

### Routes

- **`categories.js`**: Handles the retrieval and addition of recipe categories.
- **`recipes.js`**: Handles the main recipe operations, such as viewing, adding, updating, and deleting recipes.

### Views

- **`addRecipe.ejs`**: Displays a form to add a new recipe.
- **`index.ejs`**: Displays the list of all recipes with an option to delete them.
