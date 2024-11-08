import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { NextFunction } from "express";
import type { Response } from "express";
import { STATUS_CODE } from "../utils/constants.utils";
import { AuthenticatedRequest } from "../types/user.type";

// AuthenticatedRequest
// Check if the use is AUTHENTICATED or not
export const isAuthenticatedUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  let token;

  // Checking bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      res.send({
        error: "Unauthorized access.",
        message: null,
        httpStatus: STATUS_CODE.UNAUTHORIZED,
        data: null,
      })
    );
  }

  try {
    // Verify jwt
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    const userExist = await User.findById(decoded.id as string);

    if (!userExist) {
      return res.status(STATUS_CODE.RESOURCE_NOT_FOUND).json({
        error: "User not found",
        message: null,
        httpStatus: STATUS_CODE.RESOURCE_NOT_FOUND,
        data: null,
      });
    }
    req.user = userExist;

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(STATUS_CODE.UNAUTHORIZED).json({
        error: "Session expired, please log in again.",
        message: null,
        httpStatus: 401,
        data: null,
      });
    }
    // Handle other errors
    return res.status(500).json({
      error: "Invalid token,  please log in again.",
      message: error.message,
      httpStatus: STATUS_CODE.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};
