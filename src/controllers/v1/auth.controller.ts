import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import { STATUS_CODE } from "../../utils/constants.utils";
import * as userService from '../../services/v1/auth.service';

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
    })
  } catch (error) {
    console.log('error in  userRegistration controller :- ', error)
    res
      .status(STATUS_CODE.BAD_REQUEST)
      .json({ error: "Error Creating user" });
  }
};

// Note: User Login
const userLogin = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ data: "User Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Error login user" });
  }
};

// Grouping exports in an object named `authControllers`
export const authControllers = {
  userLogin,
  userRegistration,
};
