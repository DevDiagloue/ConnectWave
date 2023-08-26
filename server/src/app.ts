//npm packages
import express, { Application, Response, Request } from "express";
import cookieParser from "cookie-parser";

require("dotenv").config({
  path: ".env",
});

// Custom Modules, Packages, Configs, etc.

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//healthcheck
app.get("/healthcheck", (_, res: Response) => {
  res.status(200).json({ error: false, message: "healthcheck" });
});

export default app;
