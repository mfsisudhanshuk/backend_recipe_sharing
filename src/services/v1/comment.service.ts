import Comment from "../../models/comment.model"; // Adjust the import path as necessary
import { Types } from "mongoose";

/**
 * Fetch all comments for a specific recipe, including the user details for each comment.
 * @param {string} recipeId - The ID of the recipe for which comments are to be fetched.
 * @returns {Promise<any[]>} A list of comments with user details.
 */
export const getRecipeComments = async (recipeId: string): Promise<any[]> => {
  try {
    // Validate recipeId is a valid ObjectId
    if (!Types.ObjectId.isValid(recipeId)) {
      throw new Error("Invalid recipe ID");
    }

    // Find all comments for the given recipe ID
    const comments = await Comment.find({ recipe: recipeId }).populate(
      "user",
      "name email"
    ); // Populate user's username and email

    return comments;
  } catch (error: any) {
    throw new Error("Error fetching comments: " + error.message);
  }
};

/**
 * Create a new comment for a specific recipe.
 * @param {string} userId - The ID of the user creating the comment.
 * @param {string} recipeId - The ID of the recipe being commented on.
 * @param {string} commentText - The text of the comment.
 * @returns {Promise<any>} The created comment with populated user details.
 */
export const createRecipeComment = async (
  userId: string,
  recipeId: string,
  commentText: string
): Promise<any> => {
  try {
    // Validate userId and recipeId are valid ObjectIds
    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(recipeId)) {
      throw new Error("Invalid user ID or recipe ID");
    }

    // Check if the user has already commented on this recipe
    const existingComment = await Comment.findOne({
      user: userId,
      recipe: recipeId,
    });

    if (existingComment) {
      throw new Error("User has already commented on this recipe");
    }

    // Create a new comment document
    const newComment = new Comment({
      user: userId,
      recipe: recipeId,
      comment: commentText,
    });

    // Save the new comment to the database
    const savedComment = await newComment.save();

    // Populate the user field to return user details with the comment
    await savedComment.populate("user", "username email");

    return savedComment;
  } catch (error: any) {
    throw new Error("Error creating comment: " + error.message);
  }
};
