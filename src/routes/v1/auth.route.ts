import express from "express";
import { authControllers } from "../../controllers/v1/auth.controller";
import {
  userLoginValidator,
  userRegistrationValidator,
} from "../../middleware/authValidation.middleware";

/**
 * Router for handling recipe-related endpoints
 * @module authRouters
 * @description Provides endpoints to login, register.
 */
const authRouters = express.Router();

// NOTE: Route to Login user
authRouters.post("/login", userLoginValidator, authControllers.userLogin);

// NOTE: Route to Register user
authRouters.post(
  "/register",
  userRegistrationValidator,
  authControllers.userRegistration
);

export default authRouters;
