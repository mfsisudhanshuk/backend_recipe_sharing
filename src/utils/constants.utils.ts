/** NOTE: Errors code from our BACKEND */
export const OK: number = 200;                      // NOTE: Request processed successfully, GET REQUEST (send some response data)
export const CREATED: number = 201;                 // NOTE: created new instance
export const REQUEST_PROCESSED: number = 204;       // NOTE: when delete or updated any value
export const BAD_REQUEST: number = 400;             // NOTE: request is incomplete or mismatched
export const UNAUTHORIZED: number = 401;            // NOTE: Unauthorized (wrong username or password)
export const FORBIDDEN: number = 403;               // NOTE: forbidden (User does not have permission to access)
export const RESOURCE_NOT_FOUND: number = 404;      // NOTE: resource not found
export const CONFLICT: number = 409;                // NOTE: data already exists in DB
export const UNSUPPORTED_MEDIA_TYPE: number = 415;  // NOTE: wrong file type
export const INTERNAL_SERVER_ERROR: number = 500;   // NOTE: some exception occured


export const REGEX_NUMBER: RegExp = /^\d+$/;
export const REGEX_EMAIL: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const JPEG = "jpeg";
export const JPG = "jpg";
export const PNG = "png";


export const FORGOT_PASSWORD = "forgot-password";
export const PASSWORD_RESET = "password-reset";
