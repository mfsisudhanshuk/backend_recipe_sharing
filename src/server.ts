// NOTE: Add external package imports
import express from "express";
import type { Request, Response } from "express";
import os from "os";
import type { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

// NOTE: Setting Up Environmennt
if (process.env.NODE_ENV == "production") {
  dotenv.config({ path: "./.env.prod" });
} else {
  dotenv.config({ path: "./.env.local" });
}

// NOTE: Add internal importss
import { connectDatabase } from "./config/database.config";
import recipeRouters from "./routes/v1/recipe.route";
import authRouters from "./routes/v1/auth.route";
import commentRouters from "./routes/v1/comment.route";
import { ROUTE_NOT_FOUND, STATUS_CODE } from "./utils/constants.utils";

const app: Express = express();
const PORT: Number = process.env.PORT ? parseInt(process.env.PORT) : 8001;

// NOTE: Add Middleware
app.use(express.json());

app.use(cors());

// NOTE: Add routes
app.use("/api/v1/", recipeRouters);

app.use("/api/v1/auth/", authRouters);

app.use("/api/v1/comments/", commentRouters);

// NOTE: Healthcheck API, Added type `any` to avoid typescript error
app.get("/healthcheck", (req: Request, res: Response) : any => {
 
 const cpuModel = os.cpus()[0]?.model;
 const cpuCount = os.cpus().length; 

 // Get system memory usage in MB
 const freeMemoryMB = (os.freemem() / (1024 * 1024)).toFixed(2); // Free memory in MB
 const totalMemoryMB = (os.totalmem() / (1024 * 1024)).toFixed(2); // Total memory in MB

 // System uptime in seconds
 const uptime = os.uptime();

 return res.status(STATUS_CODE.OK).json({
   error: null,
   message: "API is working",
   data: {
     system: {
       cpu: {
         model: cpuModel,
         cores: cpuCount,
       },
       memory: {
         free: `${freeMemoryMB} MB`,
         total: `${totalMemoryMB} MB`,
       },
       uptime: `${uptime} seconds`,
     },
   },
   httpStatus: STATUS_CODE.OK,
 });
});

// NOTE: Handling unhandled routes at the END.
app.use("*", (req: Request, res: Response) : any => {
  return res.status(STATUS_CODE.RESOURCE_NOT_FOUND).json({
    error: ROUTE_NOT_FOUND,
    message: null,
    httpStatus: STATUS_CODE.RESOURCE_NOT_FOUND,
    data: null,
  });
});

// NOTE: Start the server
app.listen(PORT, () => {
  connectDatabase();
  console.log(
    `⚡️[server]: Server is running at http://localhost:${PORT} on ${process.pid}`
  );
});
