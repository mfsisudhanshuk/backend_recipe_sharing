import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import { STATUS_CODE } from "../../utils/constants.utils";
import * as userService from "../../services/v1/auth.service";

// Note: List of recipe for Home page
const userRegistration = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(STATUS_CODE.BAD_REQUEST).json({ errors: errors.array() });
  }

  try {
    // Register the user through the service layer
    const { user, token } = await userService.registerUser(req.body);
    res.status(STATUS_CODE.CREATED).json({
      message: "User registered successfully",
      data: { user, token },
    });
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST).json({ error: "Error Creating user" });
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
        message: "User login successful",
        data: { user, token },
        httpStatus: STATUS_CODE.OK,
      });
    } else {
      // Send forbidden response for failed login attempt
      return res.status(STATUS_CODE.FORBIDDEN).json({
        error: "Invalid email or password",
        message: null,
        data: null,
        httpStatus: STATUS_CODE.FORBIDDEN,
      });
    }
  } catch (error: any) {
    // Send error response
    console.error("Error in userLogin controller:", error);
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Error logging in user",
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
