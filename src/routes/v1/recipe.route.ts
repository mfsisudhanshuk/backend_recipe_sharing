import express from "express";
import { recipeController } from "../../controllers/v1/recipe.controller";

/**
 * Router for handling recipe-related endpoints
 * @module recipeRouters
 * @description Provides endpoints to create, retrieve, and list recipes.
 */
const recipeRouters = express.Router();

// NOTE: Route to create a new recipe
recipeRouters.post("/recipe",recipeController.createRecipe); //TODO: Addd middleware only auth user

// NOTE: Route to get a specific recipe by ID
recipeRouters.get("/recipe/:id", recipeController.getRecipe);

// NOTE: Route to list of recipe
recipeRouters.get("/recipes", recipeController.getRecipeList);

export default recipeRouters;