// validators/userValidator.js
import { body } from 'express-validator';
import User from '../models/user.model';
import { VALIDATION_MESSAGE_LOGIN , VALIDATION_MESSAGE_REGISTER, PASSWORD_MIN_LENGTH, NAME_MIN_LENGTH, NAME_MAX_LENGTH} from '../utils/constants.utils';

export const userRegistrationValidator = [
    body('name')
        .isString()
        .isLength({ min: NAME_MIN_LENGTH, max: NAME_MAX_LENGTH })
        .withMessage(VALIDATION_MESSAGE_REGISTER.NAME),

    body('email')
        .isEmail()
        .withMessage(VALIDATION_MESSAGE_REGISTER.EMAIL_VALIDATION)
        .custom(async (email) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error(VALIDATION_MESSAGE_REGISTER.EMAIL_ALREADY_EXIST); // This error will be returned if email exists
            }
            return true; // If no error, return true to proceed
        }),

    body('password')
        .isLength({ min: PASSWORD_MIN_LENGTH})
        .withMessage(VALIDATION_MESSAGE_REGISTER.PASSWORD_VALIDATION),
];


export const userLoginValidator = [
    body('email')
        .isEmail()
        .withMessage(VALIDATION_MESSAGE_LOGIN.EMAIL_VALIDATION),

    body('password')
        .isLength({ min: PASSWORD_MIN_LENGTH })
        .withMessage(VALIDATION_MESSAGE_LOGIN.PASSWORD_VALIDATION),
];
