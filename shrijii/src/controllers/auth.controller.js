import userModel from "../models/user.model.js";
import { sendEmail } from "../services/email.service.js";
import jwt from "jsonwebtoken"
export async function register(req,res)
{
    const {email,username,password}=req.body;
    const isUserExist=await userModel.findOne({
        $or:[
            {
                email
            },
            {
                username
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
    const user=await userModel.create({
        username,email,password
    })
    const emailVerificationToken=jwt.sign(
        {
            email:user.email
        },
        process.env.JWT_SECRET
    )
    await sendEmail({
        to:email,
        subject:"shri ji",
        html: `
        <p>Hi ${username},</p>
        <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you!</p>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">
            Verify Email
        </a>
        <p>If you did not create an account, please ignore this email.</p>
        <p>Best regards,<br>The Perplexity Team</p>
        `,
    })
    res.status(200).json({
        "shriji":"shriji all set"
    })
}
export async function verifyEmail(req,res)
{
    try {
    const {token}=req.query;
    const payload=await jwt.verify(token,process.env.JWT_SECRET)
    const user=await userModel.findOne({email:payload.email})
    if (!user) {
            return res.status(400).json({
                message: "Invalid token"
            });
    }
    user.verified=true;
    await user.save();
    res.json({
            message: "Email verified successfully ✅"
    });
    } catch (error) {
        res.status(400).json({
            message: "Token expired or invalid"
        });
    }
}
export async function sendEmailAgain(req,res)
{
    // user click karta hai ki mujhe toh email mila hi nahi hai toh wo click karta hai verify-email then waha se email aata ahai  backend mein ab backend ka kaam shru
//     Ab Problem Scenario (Resend kab use hota hai?)

// User bolta hai:

// "Mujhe email mila hi nahi 😭"

// 🔁 Resend Flow (IMPORTANT PART)
// 🔹 Step 4: User kya click karta hai?

// 👉 Frontend me button hota hai:

// [ Resend Email ]

// 👉 Ye koi email link nahi hai
// 👉 Ye frontend button hai

// 🔹 Step 5: Frontend kya karta hai?
// fetch("/api/auth/resend-email", {
//   method: "POST",
//   body: JSON.stringify({ email })
// })

// 👉 Backend ko request jaati hai

    const {email}=req.body;
    const user=await userModel.findOne({email})
     if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
    if (user.verified) {
            return res.status(400).json({
                message: "Already verified"
            });
        }
    const emailVerificationToken=jwt.sign(
        {
            email:user.email
        },
        process.env.JWT_SECRET
        ,{
            expiresIn:"10m"
        }
    )
    await sendEmail({
      to: email,
      subject: "Resend Verification",
      html: `<a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">
                Verify Again
             </a>`
    });
    res.json({ message: "Email resent" });
}
export async function getMe(req,res)
{
    const payload=req.user;
    const user=await userModel.findById(payload.id);
    
}
export async function login(req,res)
{
    const {email,password}=req.body;
    const user=await userModel.findOne({email}).select("+password");
    if(!user)
    {
        return res.status(400).json({
            message:"invalid email or password",
            success:false,
            err:"user not found by shri ji"
        })
    }
    const checkPassword=await user.comparePassword(password);
    if(!checkPassword)
    {
        return res.status(400).json({
            message:"invalid email or password",
            success:false,
            err:"incorrect password"
        })
    }
    if(!user.verified)
    {
        return res.status(400).json({
            message:"please verify your email beffore logging",
            success:false,
            err:"EMAIL NOT VERIFIED"
        })
    }
    const token=jwt.sign(
        {
            email:user.email,
            id:user._id,
            username:user.username
        },
        process.env.JWT_SECRET
    )
    res.cookie("token",token);
    res.status(200).json({
        message:"login successful",
        success:true,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}