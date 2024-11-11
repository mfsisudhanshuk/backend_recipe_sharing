import type { Request, Response } from "express";
import * as recipeService from "../../services/v1/recipe.service";
import { validationResult } from "express-validator";
import {
  FAILED_MESSAGES,
  STATUS_CODE,
  SUCCESS_MESSAGES,
} from "../../utils/constants.utils";
import { AuthenticatedRequest } from "../../types/user.type";
import { rateRecipe } from "../../services/v1/recipe.service";

// Note: List of recipe for Home page
// TODO: Update any type
const getRecipeList = async (req: Request, res: Response): Promise<any> => {
  const ingredient = req.query.ingredient as string;
  const time = req.query.time ? Number(req.query.time) : 0;
  const rating = req.query.rating ? Number(req.query.rating) : 0;
  try {
    const recipes = await recipeService.getAllRecipes(ingredient,time, rating)  ;
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
export const rateRecipeById = async (req: AuthenticatedRequest, res: Response) : Promise<any> => {
  try {
    const { recipeId } = req.params;
    const { rating } = req.body;

    const userId = req.user?._id;

    // Call service to rate the recipe
    const updatedRecipe = await rateRecipe(recipeId, userId, rating);
    
    return res.status(STATUS_CODE.OK).json({
      error: null,
      message: "Recipe rated successfully",
      data: updatedRecipe,
      httpStatus: STATUS_CODE.OK,
    });
  } catch (error: any) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      error: error.message,
      message: null,
      data: null,
      httpStatus: STATUS_CODE.INTERNAL_SERVER_ERROR,
    });
  }
};

// TODO: Controller to handle image upload for a recipe.
export const uploadImageController = async (req: any, res: Response) : Promise<any>=> {
  try {
    const file = req.file;

    if (!file) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        error: "No image file provided",
        message: null,
        data: null,
        httpStatus: STATUS_CODE.BAD_REQUEST,
      });
    }

    const response = await recipeService.uploadRecipeImage(file);

    return res.status(STATUS_CODE.OK).json({
      error:  null,
      message: "Image upload successfully",
      data: response,
      httpStatus: STATUS_CODE.OK,
    });
  } catch (error: any) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      error: error.message,
      message: null,
      data: null,
      httpStatus: STATUS_CODE.INTERNAL_SERVER_ERROR,
    });
  }
};


//NOTE: Grouping exports in an object named `recipeController`
export const recipeController = {
  getRecipeList,
  getRecipe,
  createRecipe,
  rateRecipeById,
  uploadImageController,
};
