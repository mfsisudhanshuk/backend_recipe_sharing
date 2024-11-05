import type { Request, Response } from "express";
import * as commentRecipeService from "../../services/v1/comment.service";
import { AuthenticatedRequest } from "../../types/user.type";
import { validationResult } from "express-validator";

const getRecipeComments = async (req: Request, res: Response): Promise<any> => {
  const { recipeId } = req.params; // Extract recipe ID from route parameters

  try {
    const comments = await commentRecipeService.getRecipeComments(recipeId);

    if (comments.length === 0) {
       res.status(404).json({
        error: "No comments found for this recipe.",
        message: null,
        httpStatus: 404,
        data: null,
      });
    }

     res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error: any) {
     res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
      httpStatus: 500,
      data: null,
    });
  }
};

export const createRecipeComment = async (req: AuthenticatedRequest, res: Response) : Promise<any>=> {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  
  const { recipeId } = req.params; // Get recipe ID from route parameters
  const { comment } = req.body; // Get user ID and comment text from request body

  const userId = req.user._id;

  try {
    // Validate input
    if (!userId || !comment) {
       res.status(400).json({
        error: "User ID and comment text are required",
        message: null,
        httpStatus: 400,
        data: null,
      });
    }

    // Call the service to create a comment
    const newComment = await commentRecipeService.createRecipeComment(
      userId,
      recipeId,
      comment
    );

     res.status(201).json({
      success: true,
      data: newComment,
    });
  } catch (error: any) {
     res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
      httpStatus: 500,
      data: null,
    });
  }
};

//NOTE: Grouping exports in an object named `recipeController`
export const recipeCommentController = {
  getRecipeComments,
  createRecipeComment
};
