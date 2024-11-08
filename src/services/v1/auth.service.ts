// services/userService.js
import User from '../../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { SALT_ROUND } from '../../utils/constants.utils';
import { userPayload } from '../../types/user.type';


export const registerUser = async (userData: userPayload) => {

   const hashedPassword = await bcrypt.hash(userData.password as string, SALT_ROUND);
 
   const newUser = new User({ ...userData, password: hashedPassword });
   await newUser.save();

  // Generate JWT token
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });

  return { user: newUser, token };
};

export const loginUser = async (email: string, password: string) => {

   // Check if user exists
   const user = await User.findOne({ email }).select('+password');
   
   if (!user) {
     throw new Error('Invalid email or password');
   }
 
   const isPasswordValid = await bcrypt.compare(password, user.password);
   if (!isPasswordValid) {
     return { isLoggedIn: false, user: null, token: null };
   }

   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
     expiresIn: process.env.JWT_EXPIRES_TIME,
   });
 
   return { isLoggedIn: true, user, token };
};
