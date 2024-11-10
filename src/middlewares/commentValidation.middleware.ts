import { body } from 'express-validator';
import { VALIDATION_MESSAGE_COMMENT } from '../utils/constants.utils';

// Validate fields when creating a new comment
export const validateComment = [
  body("comment")
    .isString()
    .isLength({ min: 1 })
    .withMessage(VALIDATION_MESSAGE_COMMENT.COMMENT),
];
