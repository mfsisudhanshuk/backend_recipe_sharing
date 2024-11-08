import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import { FAILED_MESSAGES, STATUS_CODE, SUCCESS_MESSAGES } from "../../utils/constants.utils";
import * as userService from "../../services/v1/auth.service";

// Note: List of recipe for Home page
const userRegistration = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({ 
      errors: errors.array(),
      message: null,
      data: null,
      httpStatus: STATUS_CODE.BAD_REQUEST
    });
  }

  try {
    // Register the user through the service layer
    const { user, token } = await userService.registerUser(req.body);
    return res.status(STATUS_CODE.CREATED).json({
      error: null,
      message: SUCCESS_MESSAGES.REGISTER,
      data: { user, token },
      httpStatus: STATUS_CODE.CREATED,
    });
  } catch (error:  any) {
    // res.status(STATUS_CODE.BAD_REQUEST).json({ error: "Error Creating user" });
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      error: error.message || FAILED_MESSAGES.REGISTER,
      message: null,
      data: null,
      httpStatus: STATUS_CODE.INTERNAL_SERVER_ERROR,
    });

  }
};

// Note: User Login
const userLogin = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return on validation errors
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      errors: errors.array(),
      message: null,
      data: null,
      httpStatus: STATUS_CODE.BAD_REQUEST,
    });
  }

  const { email, password } = req.body;

  try {
    // Call the login service
    const { isLoggedIn, user, token } = await userService.loginUser(
      email,
      password
    );

    if (isLoggedIn) {
      // Send success response
      return res.status(STATUS_CODE.OK).json({
        error: null,
        message: SUCCESS_MESSAGES.LOGIN,
        data: { user, token },
        httpStatus: STATUS_CODE.OK,
      });
    } else {
      // Send forbidden response for failed login attempt
      return res.status(STATUS_CODE.FORBIDDEN).json({
        error: FAILED_MESSAGES.INVALID_EMAIL_OR_PASSWORD,
        message: null,
        data: null,
        httpStatus: STATUS_CODE.FORBIDDEN,
      });
    }
  } catch (error: any) {
    // Send error response
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      error: error.message || FAILED_MESSAGES.LOGIN,
      message: null,
      data: null,
      httpStatus: STATUS_CODE.INTERNAL_SERVER_ERROR,
    });
  }
};

// Grouping exports in an object named `authControllers`
export const authControllers = {
  userLogin,
  userRegistration,
};
