import type { Request } from "express";
export interface AuthenticatedRequest extends Request {
    user?: any; // You can replace `any` with a specific User type if available
  }

export type userRegisterPayload = {

} 


export type userLoginPayload = {

}
  
export type userPayload = {
  name: String,
  email: String,
  password: String,
}