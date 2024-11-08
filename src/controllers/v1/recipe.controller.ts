import type { Request, Response } from "express";
import * as recipeService from "../../services/v1/recipe.service";
import { validationResult } from "express-validator";
import { STATUS_CODE } from "../../utils/constants.utils";
import { AuthenticatedRequest } from "../../types/user.type";

// Note: List of recipe for Home page
const getRecipeList = async (req: Request, res: Response): Promise<any> => {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.status(STATUS_CODE.OK).json({ data: recipes });
  } catch (error: any) {
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Error fetching recipes: " + error.message });
  }
};


/**
 * Controller to fetch a single recipe by ID.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
const getRecipe = async (req: Request, res: Response) : Promise<any>=> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { id } = req.params; // Get the recipe ID from request parameters

  try {
    const recipe = await recipeService.getSingleRecipe(id);
    
    if (!recipe) {
      return res.status(404).json({
        error: "Recipe not found",
        message: null,
        httpStatus: 404,
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
      httpStatus: 500,
      data: null,
    });
  }
};

// Note: Create a new recipe, logged user user only can create.
export const createRecipe = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  // Validation middleware

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Send validation errors as response
    return res.status(STATUS_CODE.BAD_REQUEST).json({ errors: errors.array() });
  }

  try {
    const { title, ingredients, steps, image, preparationTime} =
      req.body;

    const newRecipe = await recipeService.createRecipe({
      title,
      ingredients,
      steps,
      image,
      preparationTime,
      createdBy: req.user._id, // This should be the ID of the logged-in user
    });

    res.status(STATUS_CODE.CREATED).json({ data: newRecipe });
  } catch (error: any) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Error creating recipe: " + error.message });
  }
};


/**
 * Controller to handle rating a recipe
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const rateRecipe = async (req: Request, res: Response) => {
  try {
    const { recipeId } = req.params;
    const { rating } = req.body;

    const updatedRecipe = await recipeService.rateRecipe(recipeId, rating);
    res.status(200).json({
      message: "Recipe rated successfully",
      data: updatedRecipe,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

//NOTE: Grouping exports in an object named `recipeController`
export const recipeController = {
  getRecipeList,
  getRecipe,
  createRecipe,
  rateRecipe,
};
