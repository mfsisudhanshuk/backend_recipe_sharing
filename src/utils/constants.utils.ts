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