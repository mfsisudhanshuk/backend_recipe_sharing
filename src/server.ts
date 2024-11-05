import express from "express";
import type { Request, Response, Express } from "express";
import cors from "cors";
import dotenv from "dotenv"

// NOTE: Setting Up Environmennt
if (process.env.NODE_ENV == "production") {
  dotenv.config({ path: "./.env.prod" });
} else {
  dotenv.config({ path: "./.env.local" });
}

// NOTE: Add importS
import { connectDatabase } from "./config/database.config";
import recipeRouters from "./routes/v1/recipe.route";
import authRouters from "./routes/v1/auth.route";
import { STATUS_CODE } from "./utils/constants.utils";


const app: Express = express();
const PORT: Number = process.env.PORT ? parseInt(process.env.PORT) : 8001;

// NOTE: Add Middleware
app.use(express.json());

// NOTE: Add routes
app.use("/api/v1/", recipeRouters);

app.use("/api/v1/auth/", authRouters);

// NOTE: Test API for development 
app.get("/healthcheck", (req: any, res: any) => {
  return res.status(200).json({
    message: "API is working",
  });
});


app.use(cors());

// NOTE: Handling unhandled routes at the END.
app.use("*", (res: any) => {
  return res.status(STATUS_CODE.RESOURCE_NOT_FOUND).json({
    error: "Route not found",
    message: null,
    httpStatus: 404,
    data: null,
  });
});

// NOTE: Start the server
app.listen(PORT, () => {
  connectDatabase();
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT} on ${process.pid}`);
});
