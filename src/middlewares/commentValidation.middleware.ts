import { body } from 'express-validator';

// Validate fields when creating a new comment
export const validateComment = [
  body("comment")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Comment text is required and should not be empty"),
];
