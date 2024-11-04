import type { Request, Response } from "express";

// Note: List of recipe for Home page
const getRecipeList = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ data: "Return the list of recipe created" });
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipe" });
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
const createRecipe = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ data: "Create a new recipe" });
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipe" });
  }
};

// Grouping exports in an object named `recipeController`
export const recipeController = {
  getRecipeList,
  getRecipe,
  createRecipe,
};
