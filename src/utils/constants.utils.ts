/**
 * @constant {Object} STATUS_CODE            - Standard HTTP status codes for backend responses
 * @property {number} OK                     - Request processed successfully, typically used for GET requests with response data.
 * @property {number} CREATED                - New instance created successfully.
 * @property {number} REQUEST_PROCESSED      - Indicates successful deletion or update with no response content.
 * @property {number} BAD_REQUEST            - The request is incomplete or contains incorrect data.
 * @property {number} UNAUTHORIZED           - Authentication failed, incorrect credentials.
 * @property {number} FORBIDDEN              - User does not have permission to access this resource.
 * @property {number} RESOURCE_NOT_FOUND     - The requested resource could not be found.
 * @property {number} CONFLICT               - Duplicate data exists in the database.
 * @property {number} UNSUPPORTED_MEDIA_TYPE - The provided media type is not supported.
 * @property {number} INTERNAL_SERVER_ERROR  - A server error occurred during request processing.
 */
  
export const STATUS_CODE = {
  OK: 200,                     
  CREATED: 201,               
  REQUEST_PROCESSED: 204,    
  BAD_REQUEST: 400,            
  UNAUTHORIZED: 401,           
  FORBIDDEN: 403,              
  RESOURCE_NOT_FOUND: 404,    
  CONFLICT: 409,               
  UNSUPPORTED_MEDIA_TYPE: 415, 
  INTERNAL_SERVER_ERROR: 500,
};

export const REGEX_NUMBER: RegExp = /^\d+$/;
export const REGEX_EMAIL: RegExp =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const JPEG = "jpeg";
export const JPG = "jpg";
export const PNG = "png";

export const FORGOT_PASSWORD = "forgot-password";
export const PASSWORD_RESET = "password-reset";

export const SALT_ROUND = 10;

/**
 * Validation messages for login fields.
 * @constant
 */
export const VALIDATION_MESSAGE_LOGIN = {
  /** Message for invalid email format */
   EMAIL_VALIDATION: 'Please provide a valid email address',
   PASSWORD_VALIDATION: 'Password must be at least 5 characters long'
}

/**
 * Validation messages for register fields.
 * @constant
 */
export const VALIDATION_MESSAGE_REGISTER = {
  ...VALIDATION_MESSAGE_LOGIN,
   NAME: 'Name must be between 3 and 30 characters long',
   EMAIL_ALREADY_EXIST: 'Email already in use'
}

export const SUCCESS_MESSAGES = {
  REGISTER: 'User registered successfully',
  LOGIN: 'User login successful',
  FETCH_RECIPES: 'Recipe fetched successfully',
  ADD_RECIPE: 'Created a new recipe successfully',
  RATING_RECIPE: 'Recipe rated successfully'
}

export const FAILED_MESSAGES = {
  REGISTER: 'Error Creating user',
  LOGIN: 'Error logging in user',
  INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password',
  FETCH_RECIPES: 'Error fetching recipes',
  RECIPE_NOT_FOUND: 'Recipe not found',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  ADD_RECIPE: 'Error creating recipe',
  RATING_RECIPE: 'Recipe rated failed'
}


export const PASSWORD_MIN_LENGTH = 5;

export const NAME_MIN_LENGTH = 3;

export const NAME_MAX_LENGTH = 30;

// TODO: Uncomment and update these constants.
// export const VALIDATION_MESSAGE_RECIPE = {
  
// }

// export const VALIDATION_MESSAGE_COMMENT = {
  
// }