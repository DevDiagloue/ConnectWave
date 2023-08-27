//npm packages
import express, { Application, Response, Request } from "express";
import cookieParser from "cookie-parser";

require("dotenv").config({
  path: ".env.local",
});

// Custom Modules, Packages, Configs, etc.
import { initRoutes } from "./routes/index.routes";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//healthcheck
app.get("/healthcheck", (_, res: Response) => {
  res.status(200).json({ error: false, message: "healthcheck" });
});

initRoutes(app);
export default app;
