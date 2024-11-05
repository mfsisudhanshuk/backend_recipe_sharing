import type { Request, Response } from "express";
import * as recipeService from "../../services/v1/recipe.service";
import {  validationResult } from "express-validator";
import { STATUS_CODE } from "../../utils/constants.utils";

// Note: List of recipe for Home page
const getRecipeList = async (req: Request, res: Response) : Promise<any> => {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.status(STATUS_CODE.OK).json({ data: recipes });
  } catch (error: any) {
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Error fetching recipes: " + error.message });
  }
};

// Note: Get single recipe i.e detail page
const getRecipe = async (req: Request, res: Response) => {
  try {
    res.status(STATUS_CODE.OK).json({ data: "Get recipe by user id" });
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "Error fetching recipe" });
  }
};

// Note: Create a new recipe, logged user user only can create.
export const createRecipe = async (
  req: Request,
  res: Response
): Promise<any> => {
  // Validation middleware
  // const validateRecipe = [
  //   body("title")
  //     .isString()
  //     .isLength({ min: 3, max: 100 })
  //     .withMessage("Title should be between 3 and 100 characters"),
  //   body("ingredients")
  //     .isArray({ min: 1 })
  //     .withMessage("Ingredients should be an array with at least one item"),
  //   body("steps").isString().withMessage("Steps are required"),
  //   body("image").optional().isURL().withMessage("Image should be a valid URL"),
  //   body("preparationTime")
  //     .isInt({ min: 1 })
  //     .withMessage("Preparation time should be a positive integer"),
  // ];

  const errors = validationResult(req);

  console.log('errors ', errors);

  if (!errors.isEmpty()) {
    // Send validation errors as response
    return res.status(STATUS_CODE.BAD_REQUEST).json({ errors: errors.array() });
  }


  try {
    const { title, ingredients, steps, image, preparationTime, createdBy } =
      req.body;

    // You can add more validation here as needed

    const newRecipe = await recipeService.createRecipe({
      title,
      ingredients,
      steps,
      image,
      preparationTime,
      createdBy, // This should be the ID of the logged-in user
    });

    res.status(STATUS_CODE.CREATED).json({ data: newRecipe });
  } catch (error: any) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "Error creating recipe: " + error.message });
  }
};

//NOTE: Grouping exports in an object named `recipeController`
export const recipeController = {
  getRecipeList,
  getRecipe,
  createRecipe,
};
