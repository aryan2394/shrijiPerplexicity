import userModel from "../models/user.model.js";
import { sendEmail } from "../services/email.service.js";
export async function register(req,res)
{
    const {username,email,password}=req.body;
    // we have used the auth valiadator matlab humein username,emaila nd apssword ab sahi format mein toh milega iski gurantee hai
    const isUserExist=await userModel.findOne({
        $or:[
            {
                username
            },
            {
                email
            }
        ]
    })
    if(isUserExist)
    {
        return res.status(409).json({
            message:"user already exists by username or email",
            shriji:"shriji",
            success:false,
            error:"user already exists"
        })
    }
    const user=await userModel.create({username,email,password});
    // humne ek middleware lagaya hai jo password ko hash karega before saving
    
    // Send email in background without blocking the response
    sendEmail({
        to: email,
        subject: "Welcome to Perplexity!",
        html: `
        <p>Hi ${username},</p>
        <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board.</p>
        <p>Best regards,<br>The Perplexity Team</p>`,
    }).catch((err) => console.log("Email send failed:", err))
    
    res.status(201).json({
        shriji:"user register by shri ji",
        success:true,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}