import { body } from "express-validator";

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
