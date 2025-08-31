import express from "express";
import { authenticateAPIKey } from "../middleware/apikey.middleware.js";
import { authenticateJWT } from "../middleware/auth.middleware.js";
import { validateProject, validateProjectUpdate } from "../utils/validator.js";
import {
  createProject,
  deleteProject,
  exportProject,
  getProjectById,
  getProjects,
  updateProject,
} from "../controllers/Project.controller.js";
import { handleValidationErrors } from "../middleware/validation.middleware.js";

const projectRoute = express.Router();

projectRoute.use(authenticateJWT, authenticateAPIKey);

projectRoute.post(
  "/createProject",
  validateProject,
  handleValidationErrors, createProject
);
projectRoute.get("/getAllProjects", getProjects);
projectRoute.get("/getProjectById/:id", getProjectById);
projectRoute.put("/updateProject/:id",validateProjectUpdate,handleValidationErrors,  updateProject);
projectRoute.delete("/deleteProject/:id", deleteProject);
projectRoute.get("/export/:id", exportProject);

export default projectRoute;
