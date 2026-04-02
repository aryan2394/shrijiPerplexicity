import { Router } from "express";
const authRouter=Router();
import { register ,verifyEmailController,loginController,getMeController,sendEmailAgain} from "../controllers/auth.controller.js";
import { registerValidation,loginValidate } from "../validators/auth.validator.js";
import { authUser } from "../middlewares/auth.middleware.js";
authRouter.post("/register",registerValidation,register);
authRouter.post("/login",loginValidate,loginController);
authRouter.get("/get-me",authUser,getMeController)
authRouter.get("/verify-email",verifyEmailController)
authRouter.post("/resend-email",sendEmailAgain);
export default authRouter;