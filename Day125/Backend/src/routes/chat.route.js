import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { deleteChat, getChats, getMessages, sendMessage } from "../controllers/chat.controller.js";
const chatRouter=Router();

// user can create and follow and continue the chats
chatRouter.post("/message",authUser,sendMessage)

// user can see all its chat that is created in the database
chatRouter.get("/",authUser,getChats)

// user can get all the messages of the particular chat
chatRouter.get("/:chatId/messages",authUser,getMessages)

// user can delete the particular chat and agar chat hi delete ho gayai then uske anadar ke saare message sko bhi delete kardo
chatRouter.delete("delete/:chatId",authUser,deleteChat);


// user can delete the messages of the particular chat
// ye features humare actual models mein bhi nahi hai 
chatRouter.delete("/delete/:chatId",authUser,)
export default chatRouter;