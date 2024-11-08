// validators/userValidator.js
import { body, check } from "express-validator";
import mongoose from "mongoose";

export const validateRecipe = [
  body("title")
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title should be between 3 and 100 characters"),
  body("ingredients")
    .isArray({ min: 1 })
    .withMessage("Ingredients should be an array with at least one item"),
  body("steps").isString().withMessage("Steps are required"),
  body("image").optional().isURL().withMessage("Image should be a valid URL"),
  body("preparationTime")
    .isInt({ min: 1 })
    .withMessage("Preparation time should be a positive integer"),
];

export const validRecipeId = [
  check("id")
    .isMongoId()
    .withMessage("Invalid ID format")
    .custom((value) => {
      // Optionally check if the ID exists in the database
      return mongoose
        .model("Recipe")
        .findById(value)
        .then((recipe) => {
          if (!recipe) {
            return Promise.reject("Recipe not found");
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
        return Promise.reject('Recipe not found');
      }
    }),

  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5')
];
