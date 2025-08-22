import express from "express";
import { validateLoginUser, validateRegisterationUser } from "../utils/validator.js";
import { loginUserController, registerUserController } from "../controllers/User.controller.js";
import { handleValidationErrors } from "../middleware/validation.middleware.js";

const userRouter = express.Router();


userRouter.post(
  "/register",
  validateRegisterationUser,
  handleValidationErrors,registerUserController
);
userRouter.post(
  "/login",
  validateLoginUser,handleValidationErrors,
  loginUserController
);


export default userRouter;