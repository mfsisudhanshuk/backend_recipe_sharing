import express from "express";
import { recipeController } from "../../controllers/v1/recipe.controller";
import { param } from "express-validator";
import { isAuthenticatedUser } from "../../middleware/auth.middleware";

/**
 * Router for handling recipe-related endpoints
 * @module recipeRouters
 * @description Provides endpoints to create, retrieve, and list recipes.
 */
const recipeRouters = express.Router();

// NOTE: Route to create a new recipe
recipeRouters.post("/recipe", isAuthenticatedUser, recipeController.createRecipe); //TODO: Addd middleware only auth user

// NOTE: Route to get a specific recipe by ID
recipeRouters.get("/recipe/:recipeId", param("recipeId").isMongoId(), recipeController.getRecipe);

// NOTE: Route to list of recipe
recipeRouters.get("/recipes", recipeController.getRecipeList);

export default recipeRouters;