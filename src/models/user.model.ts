
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
// Return JSON Web Token [UTIL FOLDER]
// userSchema.methods.getJwtToken = function () {
//     return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRES_TIME,
//     });
//   };

const User = mongoose.model("User", userSchema);
export default User;
