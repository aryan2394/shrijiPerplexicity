import mongoose from "mongoose";
const messageSchema=new mongoose.Schema({
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat",
        required:[true,"chat should be requred for storing the data by shri ji"]
    },
    content:{
        type:String,
        required:[true,"content is required by shri ji"]
    },
    role:{
        type:String,
        enum:{
            values:["ai","user"],
            message:"only ai and user is allowed in these chat by shri ji"
        }
    }
},
{
    timestamps:true
})
const messageModel=mongoose.model("Message",messageSchema);
export default messageModel;