import userModel from '../models/user.model.js'
import jwt from "jsonwebtoken"
import { sendEmail } from '../services/email.service.js';
export async function register(req,res)
{
    const {email,username,password}=req.body;
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
    const emailToken=jwt.sign(
        {
            email:user.email
        },
        process.env.JWT_SECRET
    )
    await sendEmail({
        to:email,
        subject:"Perplexicity",
        html: `
        <p>Hi ${username},</p>
        <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you!</p>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="http://localhost:3000/api/auth/verify-email?token=${emailToken}">
            Verify Email
        </a>
        <p>If you did not create an account, please ignore this email.</p>
        <p>Best regards,<br>The Perplexity Team</p>
        `,
    })
    res.status(201).json({
        success:true,
        message:"user registered by shri ji",
        user:{
            username:user.username,
            id:user._id,
            email:user.email
        }
    })
}
export async function verifyEmail(req,res)
{
    const {token}=req.query;
    console.log(token);
    const payload=jwt.verify(token,process.env.JWT_SECRET);
    const user=await userModel.findOne({email:payload.email})
    console.log(user);
    user.verified=true;
    await user.save();
    const html = `
    <h1>Email Verified Successfully!</h1>
    <p>Your email has been verified. You can now log in to your account.</p>
    <a href="http://localhost:3000/login">Go to Login</a>
    `;
    return res.send(html);
}
export async function login(req,res)
{
    const {email,password}=req.body;
    console.log(email,password);
    const user=await userModel.findOne({email}).select("+password");
     if(!user)
    {
        return res.status(400).json({
            message:"invalid email or password",
            success:false,
            err:"user not found by shri ji"
        })
    }
    const passwordMatch=await user.comparePassword(password);
    if(!passwordMatch)
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
            id:user._id,
            username:user.username,
            email:user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
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
export async function getMe(req,res)
{
    const payload=req.user;
    const user=await userModel.findById(payload.id);
    res.status(200).json({
        id:user._id,
        user:user.username,
        email:user.email
    })
}
