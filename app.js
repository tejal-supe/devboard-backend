import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./src/config/environment.js";
import userRouter from "./src/routes/User.route.js";
import projectRoute from "./src/routes/Project.route.js";

const app = express();
app.use(
  cors({
    origin: config.base_url,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects",projectRoute);

export default app;
