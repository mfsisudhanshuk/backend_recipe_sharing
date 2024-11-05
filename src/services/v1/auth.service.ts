// services/userService.js
import User from '../../models/user.model';
import jwt from 'jsonwebtoken';

console.log('process env in service file ', process.env.JWT_SECRET)

export const registerUser = async (userData: any) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Create a new user and save it to the database
  const newUser = new User(userData);
  await newUser.save();

  // Generate JWT token
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });

  return { user: newUser, token };
};
