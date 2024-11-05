import express from 'express';
import { recipeCommentController } from '../../controllers/v1/comment.controller'; // Adjust the import path as necessary
import { isAuthenticatedUser } from '../../middleware/auth.middleware';
import { validateComment } from '../../middleware/commentValidation.middleware';

/**
 * Router for handling comment-related endpoints
 * @module authRouters
 * @description Provides endpoints to comment.
 */

const commentRouters = express.Router();

//NOTE: Route to fetch all comments for a recipe
commentRouters.get('/recipe/:recipeId', recipeCommentController.getRecipeComments);

//NOTE: Route to fetch all comments for a recipe
commentRouters.post('/recipe/:recipeId', isAuthenticatedUser, validateComment, recipeCommentController.createRecipeComment);

export default commentRouters;
