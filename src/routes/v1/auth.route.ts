import express from "express";
import { authControllers } from "../../controllers/v1/auth.controller";

/**
 * Router for handling recipe-related endpoints
 * @module authRouters
 * @description Provides endpoints to login, register.
 */
const authRouters = express.Router();

// NOTE: Route to Login user
authRouters.post("/login",authControllers.userLogin);

// NOTE: Route to Register user
authRouters.get("/register", authControllers.userRegistration);


export default authRouters;