import { body } from "express-validator";
import mongoose from "mongoose";

export const validateRegisterationUser = [
  body("firstName")
    .trim()
    .notEmpty()
    .isLength({ min: 2, max: 40 })
    .isAlphanumeric()
    .withMessage(
      "FirstName should be between 2 and 40 alpha numeric characters"
    ),
  body("lastName")
    .trim()
    .notEmpty()
    .isLength({ min: 2, max: 40 })
    .isAlphanumeric()
    .withMessage(
      "LastName should be between 2 and 40 alpha numeric characters"
    ),
  body("emailId")
    .trim()
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage("Enter A Valid Email"),
  body("password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password should be between 8 and 12 characters and should contain alphanumeric characters,and a special character"
    ),
];

export const validateLoginUser = [
  body("emailId")
    .trim()
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage("Enter A Valid Email"),
  body("password")
    .trim()
    .notEmpty()
    .isStrongPassword()
    .isLength({ min: 2, max: 12 })
    .withMessage("Password should be between 2 and 12 characters"),
];

export const validateProject = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("collaborators")
    .optional()
    .isArray()
    .withMessage("Collaborators must be an array")
    .custom((collaborators) => {
      if (!collaborators) return true;
      for (let i = 0; i < collaborators.length; i++) {
        const collaborator = collaborators[i];
        if (
          !collaborator.userId ||
          !mongoose.Types.ObjectId.isValid(collaborator.userId)
        ) {
          throw new Error(
            `Collaborator at index ${i} must have a valid user ID`
          );
        }
       if (
          collaborator.role &&
          !["viewer", "editor", "admin"].includes(collaborator.role)
        ) {
          throw new Error(
            `Collaborator at index ${i} must have a valid role: viewer, editor, or admin`
          );
        }
      }

      return true;
    }),

  body("isDeleted")
    .optional()
    .isBoolean()
    .withMessage("isDeleted must be a boolean value"),
];

export const validateProjectUpdate = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("collaborators")
    .optional()
    .isArray()
    .withMessage("Collaborators must be an array")
    .custom((collaborators) => {
      if (!collaborators) return true;
      for (let i = 0; i < collaborators.length; i++) {
        const collaborator = collaborators[i];
        if (
          !collaborator.userId ||
          !mongoose.Types.ObjectId.isValid(collaborator.userId)
        ) {
          throw new Error(
            `Collaborator at index ${i} must have a valid user ID`
          );
        }
        if (
          collaborator.role &&
          !["viewer", "editor", "admin"].includes(collaborator.role)
        ) {
          throw new Error(
            `Collaborator at index ${i} must have a valid role: viewer, editor, or admin`
          );
        }
      }

      return true;
    }),

  body("isDeleted")
    .optional()
    .isBoolean()
    .withMessage("isDeleted must be a boolean value"),
];

export const validateCollaborator = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("User ID must be a valid ObjectId");
      }
      return true;
    }),

  body("role")
    .optional()
    .isIn(["viewer", "editor", "admin"])
    .withMessage("Role must be one of: viewer, editor, admin"),
];