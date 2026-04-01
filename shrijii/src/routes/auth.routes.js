import { Router } from "express";
import { getMe, login, register, sendEmailAgain, verifyEmail } from "../controllers/auth.controller.js";
import { loginValidate, registerValidation } from "../validators/auth.validator.js";
import { authUser } from "../middlewares/auth.middleware.js";
const authRouter=Router();
authRouter.post("/register",registerValidation,register);
authRouter.get("/verify-email",verifyEmail)
authRouter.post("/resend-email",sendEmailAgain);
authRouter.post("/login",loginValidate,login);
authRouter.get("/get-me",authUser,getMe)
export default authRouter;