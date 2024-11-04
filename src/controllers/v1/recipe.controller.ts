import type { Request, Response } from "express";
import * as recipeService from '../../services/v1/recipe.service';

// Note: List of recipe for Home page
const getRecipeList = async (req: Request, res: Response) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    return res.status(200).json({ data: recipes });
  } catch (error: any) {
    return res.status(500).json({ error: "Error fetching recipes: " + error.message });
  }
};


// Note: Get single recipe i.e detail page
const getRecipe = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ data: "Get recipe by user id" });
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipe" });
  }
};

// Note: Create a new recipe, logged user user only can create.
export const createRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, ingredients, steps, image, preparationTime, createdBy } = req.body;

    // You can add more validation here as needed

    const newRecipe = await recipeService.createRecipe({
      title,
      ingredients,
      steps,
      image,
      preparationTime,
      createdBy, // This should be the ID of the logged-in user
    });

    res.status(201).json({ data: newRecipe });
  } catch (error: any) {
    res.status(500).json({ error: "Error creating recipe: " + error.message });
  }
};

//NOTE: Grouping exports in an object named `recipeController`
export const recipeController = {
  getRecipeList,
  getRecipe,
  createRecipe,
};
