import mongoose from "mongoose";

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
    rating: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
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
