import { Router } from "express";
import { sendMessage } from "../controllers/chat.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
const chatRouter=Router();
// humein ek route banana hai ki agar user kuch bhi questio puche then ai ke paas wo message jaaye then wo response wapas user ko hum reteurn kar de
// and ye saare routes protecetd haia then only he sholud allow to use the faetues 
// uske liye we will use the middleware authUser
chatRouter.post("/message",authUser,sendMessage);
export default chatRouter;