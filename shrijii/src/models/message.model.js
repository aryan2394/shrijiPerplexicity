import mongoose from "mongoose";
const messageSchema=new mongoose.Schema({
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat",
        required:true
    },
    content:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:{
            values:["user","ai"],
            message:"only user and AI is allowed"
        }
    }
})
const messageModel=mongoose.model("Message",messageSchema);
export default messageModel;