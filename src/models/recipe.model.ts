import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    steps: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    preparationTime: {
      type: Number, //NOTE: in minutes
    },
    ratings: {
      type: [RatingSchema], // Array to store individual user ratings
      default: [],
    },
    averageRating: {
      type: Number,
      default: 0
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false, // Disable the __v field
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
