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

export const SALT_ROUND = 10;

/**
 * Validation messages for login fields.
 * @constant
 */
export const VALIDATION_MESSAGE_LOGIN = {
  /** Message for invalid email format */
   EMAIL_VALIDATION: 'Please provide a valid email address',
   PASSWORD_VALIDATION: 'Password must be at least 5 characters long',
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

/**
 * Validation messages for recipe fields.
 * @constant
 */
export const VALIDATION_MESSAGE_RECIPE = {
  TITLE: 'Title should be between 3 and 100 characters',
  INGREDIENTS: 'Ingredients should be an array with at least one item',
  STEPS: 'Steps are required',
  PREPARATION_TIME:'Preparation time should be a positive integer',
  INVALID_RECIPE_ID: 'Invalid ID format',
  RECIPE_NOT_FOUND: 'Recipe not found'
}

/**
 * Validation messages for comment fields.
 * @constant
 */
export const VALIDATION_MESSAGE_COMMENT = {
  COMMENT: 'Comment text is required and should not be empty'
}



/**
 * Success messages.
 * @constant
 */
export const SUCCESS_MESSAGES = {
  REGISTER: 'User registered successfully',
  LOGIN: 'User login successful',
  FETCH_RECIPES: 'Recipe fetched successfully',
  ADD_RECIPE: 'Created a new recipe successfully',
  RATING_RECIPE: 'Recipe rated successfully',
  COMMENT_RECIPE: 'Comment added successfully',
  FETCH_COMMENT: 'Comment fetched successfully',
}

/**
 * Failed messages.
 * @constant
 */
export const FAILED_MESSAGES = {
  REGISTER: 'Error Creating user',
  LOGIN: 'Error logging in user',
  INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password',
  FETCH_RECIPES: 'Error fetching recipes',
  RECIPE_NOT_FOUND: 'Recipe not found',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  ADD_RECIPE: 'Error creating recipe',
  RATING_RECIPE: 'Recipe rated failed',
  NOT_FOUND_COMMENT: 'No comments found for this recipe',
  UNAUTHORIZED_ACCESS: 'Unauthorized access.',
  USER_NOT_FOUND: 'User not found',
  USER_TOKEN_EXPIRED: 'Session expired, please log in again.',
  USER_INVALID_TOKEN:'Invalid token,  please log in again.'

}

// TODO: Configure CS(Future scope)
export const csp = {
  directives: {
    defaultSrc: ["'self'"],                               // Only allow content from the same origin
    scriptSrc: ["'self'", "https://trusted.com"],         // Allow scripts from trusted sources
    styleSrc: ["'self'", "https://trusted-styles.com"],   // Allow styles from trusted sources
    imgSrc: ["'self'", "https://trusted-images.com"],    // Allow images from trusted sources
    connectSrc: ["'self'", "https://api.trusted.com"],   // Allow connections to trusted APIs
    fontSrc: ["'self'", "https://fonts.trusted.com"],    // Allow fonts from trusted sources
    frameAncestors: ["'none'"],                         // Prevent embedding in frames
  },
};

export const PASSWORD_MIN_LENGTH = 5;

export const NAME_MIN_LENGTH = 3;

export const NAME_MAX_LENGTH = 30;

export const ROUTE_NOT_FOUND= 'Route not found'
