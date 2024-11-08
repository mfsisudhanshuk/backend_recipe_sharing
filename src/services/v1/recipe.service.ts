// services/recipe.service.ts
import Recipe from "../../models/recipe.model"; // Adjust the import path as necessary

/**
 * Fetch all recipes from the database.
 * @returns {Promise<Recipe[]>} List of recipes.
 */
export const getAllRecipes = async (ingredient?: string): Promise<any[]> => {
  try {
    // If an ingredient is provided, search for recipes containing that ingredient
    const filter = ingredient
      ? { ingredients: { $regex: ingredient, $options: "i" } }
      : {};

    //  const recipes = await Recipe.find().populate('createdBy', 'username'); // TODO: Uncomment after user model adde Populate createdBy to get username
    const recipes = await Recipe.find(filter);
    return recipes;
  } catch (error: any) {
    throw new Error("Error fetching recipes: " + error.message);
  }
};

/**
 * Create a new recipe in the database.
 * @param {Object} recipeData - Data for the new recipe
 * @returns {Promise<Recipe>} The created recipe
 */
export const createRecipe = async (recipeData: any): Promise<any> => {
  // validate the recipe data.

  try {
    const newRecipe = new Recipe(recipeData);
    return await newRecipe.save();
  } catch (error: any) {
    throw new Error("Error creating recipe: " + error.message);
  }
};

/**
 * Fetch a single recipe by its ID from the database.
 * @param {string} id - The ID of the recipe to fetch.
 * @returns {Promise<Recipe | null>} The recipe if found, or null if not found.
 */
export const getSingleRecipe = async (id: string): Promise<any | null> => {
  try {
    const recipe = await Recipe.findById(id);
    return recipe; // Returns null if not found
  } catch (error: any) {
    throw new Error("Error fetching recipe: " + error.message);
  }
};


/**
 * Rate a recipe and update its average rating.
 * @param {string} recipeId - The ID of the recipe to be rated.
 * @param {number} userRating - The rating provided by the user (e.g., between 1 and 5).
 * @returns {Promise<any>} - The updated recipe with the new average rating.
 */
export const rateRecipe = async (recipeId: string, userRating: number): Promise<any> => {
  if (userRating < 1 || userRating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new Error("Recipe not found");
  }

  // Calculate new rating values
  const newRatingCount = recipe.ratingCount + 1;
  const newRatingTotal = recipe.rating * recipe.ratingCount + userRating;
  const newAverageRating = newRatingTotal / newRatingCount;

  // Update and save the recipe
  recipe.rating = newAverageRating;
  recipe.ratingCount = newRatingCount;
  await recipe.save();

  return recipe;
};