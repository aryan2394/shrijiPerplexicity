import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { generateChatTitle, generateResponse} from "../services/ai.service.js";

export async function sendMessage(req,res)
{
    const { message, chatId } = req.body;

let chat;

// ✅ CASE 1: chatId exists → try to find chat
if (chatId) {
    chat = await chatModel.findById(chatId);
}

// ❗ Agar chatId nahi mila ya exist nahi karta → new chat create
if (!chat) {
    const title = await generateChatTitle(message);

    chat = await chatModel.create({
        title,
        user: req.user.id
    });
}

// ✅ Save user message
await messageModel.create({
    chat: chat._id,
    content: message,
    role: "user"
});

// ✅ Get full conversation
const messages = await messageModel.find({ chat: chat._id }).sort({ createdAt: 1 });

// ✅ Generate AI response
const result = await generateResponse(messages);

// ✅ Save AI message
const aiMessage = await messageModel.create({
    chat: chat._id,
    content: result,
    role: "ai"
});

res.status(200).json({
    success: true,
    chatId: chat._id, // ⚡ IMPORTANT (frontend ko bhejo)
    result,
    aiMessage
});
}

// user ki jitni bhi chats hai wo sab chats ko return karo 
export async function getChats(req,res)
{
    const user=req.user;
    const chats=await chatModel.find({user:user.id});
    res.status(200).json({
        success:true,
        message:"get all the chats successfully by shri ji",
        chats
    })
}

// ek chats ke saare messages of the user

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

// ek chats ko delete karna
export async function deleteChat(req,res)
{
    const {chatId}=req.params;
    const chat=await chatModel.findById(chatId);
    if(!chat)
    {
        return res.status(404).json({
            success:false,
            messages:"no chat available by shri ji"
        })
    }
    const deleteChat=await chatModel.findByIdAndDelete(chatId);
    const messageDeleteChat=await messageModel.findOneAndDelete({
        chat:chatId
    })
    res.status(200).json({
        success:true,
        message:"deleted the chats and all related messages by shri ji"
    })
}