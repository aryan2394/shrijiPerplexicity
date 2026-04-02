import { generateChatTitle, generateResponse } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
export async function sendMessage(req,res)
{
    const {message}=req.body;
    console.log(message);
    // ye jo message jo hai humein AI ko dena haia and wo humeie jo bhi response dega AI wo hum return kar denge user ko
    // ai ko message mile uske liye hum kya karein humein data ai ko dena padega matlab ki humein serevices mein ai.services.js mein ye question ko usko invoke karna and jo bhi response aayega AI SE WO return kar dega 


    // const result=await generateResponse(message);
    // res.json({
    //     aiMessage:result
    // })

    // abhi tak humne kya kar diya hai ki jo bhi user query karein hum usko ai se response bhej rahe hai
    // lekin agar aap kabhi bhi chatGpt se pahle message karte ho next text(new chat) ke saath toh wo humein ek title bhi deti hai and wo hum usko apne se nahi dete balki wo pahle mssage ki hisab se khud hi generate karti hai
    // toh ab huemin wo title geneate karna ab with the help of AI
    // WE WILL NOT USE the gemini model for genrating the title becuse gemini is a heavy model and choti choti cheezon ke liye hum utne bade model use nahi karte therfore crwete the mistarlAi for small things
    // Mistaral AI IS a samll model toh wo response bhi jaldi deta haia and gemini thoda late karata hai 
    
    // toh these is a titlebease on the frist message 
    const title=await generateChatTitle(message);
    const response=await generateResponse(message);
    console.log(title);


    // res.json({
    //     AIMessage:response,
    //     title
    // })

        // ab humare paas title,user and AI response sab aa gaya hai toh jo humne chatModel and messageModel tha usko craete kar sakte haia 
    // becasuse uske liye humein chahiye thi title and user of the chat toh hum chatModel bana sakte hai 
    // and message modele because humare paas content hai and role (bhi ata haia mi ai ka haia ) and chat bhi presnet haia therfore we can craet the messageModel to store all the message of the chat

    const chat=await chatModel.create({
        user:req.user._id,
        title:title
    })
    const aiMessage=await messageModel.create({
        content:response,
        chat_id:chat._id,
        role:"ai"
    })
    res.json({
        message:response,
        title,
        chat,
        aiMessage
    })
}