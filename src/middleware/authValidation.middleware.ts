// validators/userValidator.js
import { body } from 'express-validator';
import User from '../models/user.model';

export const userRegistrationValidator = [
    body('name')
        .isString()
        .isLength({ min: 3, max: 30 })
        .withMessage('Name must be between 3 and 30 characters long'),

    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .custom(async (email) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('Email already in use'); // This error will be returned if email exists
            }
            return true; // If no error, return true to proceed
        }),

    body('password')
        .isLength({ min: 5})
        .withMessage('Password must be at least 5 characters long'),
];


export const userLoginValidator = [
    body('name')
        .isString()
        .isLength({ min: 3, max: 30 })
        .withMessage('Name must be between 3 and 30 characters long'),

    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address'),

    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
];
