import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
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
    select: false, // NOTE: To exclude field to be return by default.
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{
  versionKey: false, // Disable the __v field
});

const User = mongoose.model("User", userSchema);

export default User;
