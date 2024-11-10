// validators/userValidator.js
import { body, check } from "express-validator";
import mongoose from "mongoose";
import { VALIDATION_MESSAGE_RECIPE } from "../utils/constants.utils";

export const validateRecipe = [
  body("title")
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage(VALIDATION_MESSAGE_RECIPE.TITLE),
  body("ingredients")
    .isArray({ min: 1 })
    .withMessage(VALIDATION_MESSAGE_RECIPE.INGREDIENTS),
  body("steps").isString().withMessage(VALIDATION_MESSAGE_RECIPE.STEPS),
  // TODO: Image required validation remove
  // body("image").optional().isURL().withMessage("Image should be a valid URL"),
  body("preparationTime")
    .isInt({ min: 1 })
    .withMessage(VALIDATION_MESSAGE_RECIPE.PREPARATION_TIME),
];

export const validRecipeId = [
  check("id")
    .isMongoId()
    .withMessage(VALIDATION_MESSAGE_RECIPE.INVALID_RECIPE_ID)
    .custom((value) => {
      // Optionally check if the ID exists in the database
      return mongoose
        .model("Recipe")
        .findById(value)
        .then((recipe) => {
          if (!recipe) {
            return Promise.reject(VALIDATION_MESSAGE_RECIPE.RECIPE_NOT_FOUND);
          }
        });
    }),
];



export const validateRating = [
  check('recipeId')
    .isMongoId()
    .withMessage('Invalid recipe ID format')
    .custom(async (value) => {
      const recipeExists = await mongoose.model('Recipe').exists({ _id: value });
      if (!recipeExists) {
        return Promise.reject(VALIDATION_MESSAGE_RECIPE.RECIPE_NOT_FOUND);
      }
    }),

  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5')
];
