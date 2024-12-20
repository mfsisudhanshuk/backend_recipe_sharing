import type { Request, Response } from "express";
import * as commentRecipeService from "../../services/v1/comment.service";
import { AuthenticatedRequest } from "../../types/user.type";
import { validationResult } from "express-validator";
import { FAILED_MESSAGES, STATUS_CODE, SUCCESS_MESSAGES } from "../../utils/constants.utils";

const getRecipeComments = async (req: Request, res: Response): Promise<any> => {
  const { recipeId } = req.params;

  try {
    const comments = await commentRecipeService.getRecipeComments(recipeId);

    if (comments.length === 0) {
       return res.status(STATUS_CODE.OK).json({
        error: FAILED_MESSAGES.NOT_FOUND_COMMENT,
        message: null,
        httpStatus: STATUS_CODE.RESOURCE_NOT_FOUND,
        data: comments,
      });
    }

    return res.status(STATUS_CODE.OK).json({
      error: null,
      message: SUCCESS_MESSAGES.FETCH_COMMENT,
      httpStatus: STATUS_CODE.OK,
      data: comments,
    });
  } catch (error: any) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      error:error.message ,
      message: null,
      httpStatus: STATUS_CODE.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};

export const createRecipeComment = async (req: AuthenticatedRequest, res: Response) : Promise<any>=> {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      errors: errors.array(),
    });
  }
  
  const { recipeId } = req.params;
  const { comment } = req.body; 

  const userId = req.user._id;

  try {
    // Validate input
    if (!userId || !comment) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        error: "User ID and comment text are required",
        message: null,
        httpStatus: STATUS_CODE.BAD_REQUEST,
        data: null,
      });
    }

    // Call the service to create a comment
    const newComment = await commentRecipeService.createRecipeComment(
      userId,
      recipeId,
      comment
    );

     return res.status(STATUS_CODE.CREATED).json({
      error: null,
      data: newComment,
      message: SUCCESS_MESSAGES.COMMENT_RECIPE,
      httpStatus: STATUS_CODE.CREATED
    });
  } catch (error: any) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      error: error.message || FAILED_MESSAGES.INTERNAL_SERVER_ERROR,
      message: null,
      httpStatus: STATUS_CODE.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};

//NOTE: Grouping exports in an object named `recipeController`
export const recipeCommentController = {
  getRecipeComments,
  createRecipeComment
};
