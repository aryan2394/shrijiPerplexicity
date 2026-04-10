import {body} from "express-validator"

export const registerValidation = [
  // ✅ Username
  body("username")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),

  // ✅ Email
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Enter a valid email"),

  // ✅ Password
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];

export const loginValidate=[
  // ✅ Email
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Enter a valid email"),

  // ✅ Password
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
]
