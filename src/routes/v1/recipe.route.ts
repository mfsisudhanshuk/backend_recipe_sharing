import express from "express";
import { recipeController } from "../../controllers/v1/recipe.controller";
import { isAuthenticatedUser } from "../../middlewares/auth.middleware";
import {
  validateRecipe,
  validRecipeId,
  validateRating,
} from "../../middlewares/recipeValidation.middleware";
import multer from "multer";

/**
 * Router for handling recipe-related endpoints
 * @module recipeRouters
 * @description Provides endpoints to create, retrieve, and list recipes.
 */
const recipeRouters = express.Router();

// Multer configuration for file uploads
const upload = multer({ dest: "uploads/" });

// NOTE: Route to create a new recipe
recipeRouters.post(
  "/recipe",
  isAuthenticatedUser,
  validateRecipe,
  recipeController.createRecipe
);

// NOTE: Route to get a specific recipe by ID
recipeRouters.get("/recipe/:id", validRecipeId, recipeController.getRecipe);

// NOTE: Route to list of recipe
recipeRouters.get("/recipes", recipeController.getRecipeList);

recipeRouters.post("/upload", isAuthenticatedUser, upload.single("image"), recipeController.uploadImageController);

// Note: Route to rate on recipe
recipeRouters.post(
  "/recipes/:recipeId/rating",
  isAuthenticatedUser,
  validateRating,
  recipeController.rateRecipeById
);

export default recipeRouters;
