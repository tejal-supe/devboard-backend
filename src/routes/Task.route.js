import express from "express";
import { authenticateJWT } from "../middleware/auth.middleware.js";
import { authenticateAPIKey } from "../middleware/apikey.middleware.js";
import { validateProject, validateProjectUpdate } from "../utils/validator.js";
import { handleValidationErrors } from "../middleware/validation.middleware.js";
import { createTask, deleteTask, getAllTasks, updateTaskById } from "../controllers/Task.controller.js";

const taskRoute = express.Router();

taskRoute.use(authenticateJWT,authenticateAPIKey)
taskRoute.post("/createTask/:projectId",validateProject,handleValidationErrors,createTask);
taskRoute.get("/getAllTasks/:projectId", getAllTasks);
taskRoute.put("/updateTask/:id",validateProjectUpdate,handleValidationErrors,updateTaskById);
taskRoute.delete("/deleteTask/:id",deleteTask)



export default taskRoute;