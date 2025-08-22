import jwt from "jsonwebtoken";
import config from "../config/environment.js";
import User from "../models/User.model.js";

export const authenticateJWT = async (req, res, next) => {
  try {
   const token = req.cookies?.token;

    if (!token) {
      return errorResponse(res, 401, "Access denied. No token provided.");
    }

    const decoded = jwt.verify(token, config.jwt_secret);
    const userDecoded = await User.findById(decoded.id);

    if (!userDecoded) {
      return res
        .status(400)
        .json({ message: "Token not found. Invalid User!" });
    }

    req.user = userDecoded;
    next();
  } catch (error) {
    console.log("Error in auth middleware",error);
    
  }
};
