import {body,validationResult} from "express-validator"
const validate=(req,res,next)=>
{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            "sucess":false,
            "error":errors.array()
        })
    }
    next();
}
export const registerValidation=[
    // username
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3,max:15})
    .withMessage("Username must be at between 3 to 15 characters"),

  // email
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email"),

  // password (STRONG)
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least 1 lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least 1 uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least 1 number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least 1 special character"),
    validate
]