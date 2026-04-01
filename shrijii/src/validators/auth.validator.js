import { body,validationResult } from "express-validator";
async function validate(req,res,next)
{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            message:"shri ji data give correct",
            status:false,
            errors:errors.array()
        })
    }
    next();
}
export const registerValidation=[
    body("username")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Enter a valid email"),
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    validate
]
export const loginValidate=[
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Enter a valid email"),
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    validate
]