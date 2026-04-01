import {Router} from "express"
import {register,login, verifyEmail, getMe} from "../controllers/auth.controller.js"
import { loginValidate, registerValidation } from "../validators/auth.validator.js";
import { authUser } from "../middlewares/auth.middleware.js";
const authRouter=Router();
authRouter.post("/register",registerValidation,register);
authRouter.post("/login",loginValidate,login);
authRouter.get("/verify-email",verifyEmail)
authRouter.get("/get-me",authUser,getMe);
export default authRouter;