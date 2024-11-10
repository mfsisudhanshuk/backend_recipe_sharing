// Database connection
import mongoose from "mongoose";
export const connectDatabase = () => {
  const MONGODB_CONN_URL: string = process.env.MONGODB_CONN_URL
    ? process.env.MONGODB_CONN_URL
    : "Mogodb URL in env is missing";
  
  mongoose
    .connect(MONGODB_CONN_URL)
    .then((con) => {
      console.log(
        `MongoDB Database connected with host ${con.connection.host}`
      );
    })
    .catch((err) => console.log("error: ", err));//TODO: Update the logger instead of console.
};

// To remove Deprecation Warning
mongoose.set("strictQuery", true);
