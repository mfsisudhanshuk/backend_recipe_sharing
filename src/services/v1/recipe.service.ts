// services/recipe.service.ts
import mongoose from "mongoose";
import cloudinary from "../../config/cloudinary.config";
import Recipe from "../../models/recipe.model"; // Adjust the import path as necessary

/**
 * Fetch all recipes from the database.
 * @returns {Promise<Recipe[]>} List of recipes.
 */
export const getAllRecipes = async (ingredient?: string, time?: number, rating?: number): Promise<any[]> => {
  try {

    // Initialize filter
    const filter: any = {};

    // Ingredient filter (if provided)
    if (ingredient) {
      filter.ingredients = { $regex: ingredient, $options: "i" };
    }

    // Preparation time filter (if provided)
    if (time && time > 0) {
      filter.preparationTime = { $lte: time };
    }

    // Average rating filter (if provided)
    if (rating && rating > 0) {
      filter.averageRating = { $gte: rating };
    }

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
export const getSingleRecipe = async (id: string): Promise<any> => {
  try {
    const recipe = await Recipe.findById(id);
    return recipe; // Returns null if not found
  } catch (error: any) {
    throw new Error("Error fetching recipe: " + error.message);
  }
};


/**
 * Rate a recipe or update the user's existing rating.
 * @param {string} recipeId - The ID of the recipe to be rated.
 * @param {string} userId - The ID of the user providing the rating.
 * @param {number} userRating - The rating provided by the user (between 1 and 5).
 * @returns {Promise<any>} - The updated average rating and ratings list.
 */
export const rateRecipe = async (recipeId: string, userId: string, userRating: number): Promise<any> => {
  if (userRating < 1 || userRating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  try {
    // Fetch the recipe by ID
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      throw new Error("Recipe not found");
    }

 
    // Find if the user has already rated this recipe
    const existingRating = recipe.ratings.find(
      (rating) =>  rating.userId.toString() === userId.toString()
    );
    
    if (existingRating) {
      // If the user has already rated, update their rating
      existingRating.rating = userRating;
    } else {
      // Add new rating entry if the user has not rated yet
      recipe.ratings.push({
        userId: new mongoose.Types.ObjectId(userId),
        rating: userRating,
      });
    }

    // Calculate the new average rating
    const totalRatings = recipe.ratings.length;
    const sumOfRatings = recipe.ratings.reduce((sum, { rating }) => sum + rating, 0);
    const averageRating = totalRatings ? sumOfRatings / totalRatings : 0;

    // Update the recipe with the new average rating (optional: if you want to store it separately)
    recipe.averageRating = parseFloat(averageRating.toFixed(2));

    // Save the updated recipe
    await recipe.save();

    return {
      recipeId,
      averageRating: recipe.averageRating,
      totalRatings,
      ratings: recipe.ratings,
    };
  } catch (error: any) {
    throw new Error("Error updating rating: " + error.message);
  }
};

/**
 * Upload recipe image to Cloudinary and update recipe details.
 * @param {Express.Multer.File} file - The image file to be uploaded (req.file).
 * @returns {Promise<any>} - The updated recipe with the image URL.
 */
export const uploadRecipeImage = async (file: any): Promise<any> => {
  try {
    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "recipes", // Store images in a "recipes" folder in Cloudinary
      public_id: `Image_${Date.now()}`, // Unique public ID for the image
      transformation: {
        fetch_format: "auto",
        quality: "auto",
      },
    });

    return uploadResult.secure_url;
  } catch (error: any) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
};