// services/recipe.service.ts
import Recipe from '../../models/recipe.model'; // Adjust the import path as necessary

/**
 * Fetch all recipes from the database.
 * @returns {Promise<Recipe[]>} List of recipes.
 */
export const getAllRecipes = async (): Promise<any[]> => {
  try {
   //  const recipes = await Recipe.find().populate('createdBy', 'username'); // TODO: Uncomment after user model adde Populate createdBy to get username
    const recipes = await Recipe.find();
    return recipes;
  } catch (error: any) {
    throw new Error('Error fetching recipes: ' + error.message);
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
      throw new Error('Error creating recipe: ' + error.message);
    }
  };
