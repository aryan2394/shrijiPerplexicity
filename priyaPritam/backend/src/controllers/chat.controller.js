import { generateResponse ,generateChatTitle} from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js"
export async function sendMessage(req,res)
{
   const {message,chatId}=req.body;
   let chat=null;
   let title=null;
   if(chatId)
   {
      chat=await chatModel.findById(chatId);
   }
   if(!chat)
   {
      title=await generateChatTitle(message);
      chat=await chatModel.create({
         user:req.user.id,
         title:title
      })
   }
   const userMessage=await messageModel.create({
      chat:chat._id,
      content:message,
      role:"user"
   })
   const messages=await messageModel.find({chat:chat._id})
   const response=await generateResponse(messages);
   const aiMessage=await messageModel.create({
      chat:chat._id,
      content:response,
      role:"ai"
   })
   res.status(200).json({
      response,
      chat,

   })
}
// ek user ne kitne chats craete kiye hai 
export async function getChats(req,res)
{
   const chats=await chatModel.find({user:req.user._id});
   res.status(200).json({
        success:true,
        message:"get all the chats successfully by shri ji",
        chats
    })
}
// ek chats ke saare messages 
export async function getMessages(req,res)
{
    const {chatId}=req.params;
    // check ki jo chatId hai aisa toh nahi hai ki koi aur user kisis chat ke saare messages dekhna cha raha hai 
    const chat=await chatModel.findById(chatId);
    if(!chat)
    {
        return res.status(404).json({
            message:"chat not found by shri ji"
        })
    }
    if(chat.user!=req.user.id)
    {
        return res.status(401).json({
            success:false,
            message:"unauthorized user to see the chat by shri ji "
        })
    }
    console.log(chat,req.user);
    const messages=await messageModel.find({chat:chatId});
    res.status(200).json({
        success:true,
        messages
    })
}
// ek chats delete karna and uske related saare messages bhi sab deleete karna 
