import type { Request, Response } from "express";
import * as recipeService from "../../services/v1/recipe.service";
import { validationResult } from "express-validator";
import {
  FAILED_MESSAGES,
  STATUS_CODE,
  SUCCESS_MESSAGES,
} from "../../utils/constants.utils";
import { AuthenticatedRequest } from "../../types/user.type";

// Note: List of recipe for Home page
// TODO: Update any type
const getRecipeList = async (req: Request, res: Response): Promise<any> => {
  const ingredient = req.query.ingredient as string;
  try {
    const recipes = await recipeService.getAllRecipes(ingredient);
    return res.status(STATUS_CODE.OK).json({
      error: null,
      message: SUCCESS_MESSAGES.FETCH_RECIPES,
      data: recipes,
      httpStatus: STATUS_CODE.OK,
    });
  } catch (error: any) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      error: FAILED_MESSAGES.INTERNAL_SERVER_ERROR,
      message: error.message,
      data: null,
      httpStatus: STATUS_CODE.INTERNAL_SERVER_ERROR,
    });
  }
};

// NOTE:  Controller to fetch a single recipe by ID.
// TODO:  Update any type
const getRecipe = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      errors: errors.array(),
    });
  }

  const { id } = req.params;

  try {
    const recipe = await recipeService.getSingleRecipe(id);

    if (!recipe) {
      return res.status(STATUS_CODE.RESOURCE_NOT_FOUND).json({
        error: FAILED_MESSAGES.RECIPE_NOT_FOUND,
        message: null,
        httpStatus: 404,
        data: null,
      });
    }

    return res.status(STATUS_CODE.OK).json({
      error: null,
      message: SUCCESS_MESSAGES.FETCH_RECIPES,
      data: recipe,
      httpStatus: STATUS_CODE.OK,
    });
  } catch (error: any) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      error: FAILED_MESSAGES.INTERNAL_SERVER_ERROR,
      message: error.message,
      data: null,
      httpStatus: STATUS_CODE.INTERNAL_SERVER_ERROR,
    });
  }
};

// Note: Create a new recipe, logged user user only can create.
// TODO: Update any type
export const createRecipe = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Send validation errors as response
    return res.status(STATUS_CODE.BAD_REQUEST).json({ errors: errors.array() });
  }

  try {
    const { title, ingredients, steps, image, preparationTime } = req.body;

    const newRecipe = await recipeService.createRecipe({
      title,
      ingredients,
      steps,
      image,
      preparationTime,
      createdBy: req.user._id,
    });

    return res.status(STATUS_CODE.CREATED).json({ 
      error: null,
      message: SUCCESS_MESSAGES.ADD_RECIPE,
      data: newRecipe,
      httpStatus: STATUS_CODE.CREATED
     });
  } catch (error: any) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      error: FAILED_MESSAGES.ADD_RECIPE + error.message,
      message: null,
      data: null,
      httpStatus: STATUS_CODE.INTERNAL_SERVER_ERROR,
    });
  }
};

// Note : Controller to handle rating a recipe
// TODO: Update any type
export const rateRecipe = async (req: Request, res: Response): Promise<any> => {
  try {
    const { recipeId } = req.params;
    const { rating } = req.body;

    const updatedRecipe = await recipeService.rateRecipe(recipeId, rating);
    return res.status(STATUS_CODE.OK).json({
      error: null,
      message: SUCCESS_MESSAGES.RATING_RECIPE,
      data: updatedRecipe,
      httpStatus: STATUS_CODE.OK
    });
  } catch (error: any) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      error: error.message,
      message: null,
      data: null,
      httpStatus: STATUS_CODE.INTERNAL_SERVER_ERROR
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
