import type { Request, Response } from "express";

// Note: List of recipe for Home page
const userRegistration = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ data: "Created a new user" });
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipe" });
  }
};

// Note: Get single recipe i.e detail page
const userLogin = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ data: "User Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipe" });
  }
};

// Grouping exports in an object named `recipeController`
export const authControllers = {
  userLogin,
  userRegistration,
};
