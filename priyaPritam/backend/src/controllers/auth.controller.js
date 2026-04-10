import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { sendEmail } from "../services/email.service.js";
export async function register(req,res)
{
    const {username,email,password}=req.body;
    console.log(username,email,password);
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
    const emailVerificationToken=await jwt.sign(
        {
            email:user.email,
        },
        process.env.JWT_SECRET
    )
    await sendEmail({
      to: email,
      subject: "Welcome to Perplexity!",
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
    });
    res.status(201).json({
        success:true,
        message:"You are regsietered, please verify email to continue and use our service by shri ji",
    })
}
export async function verifyEmail(req,res)
{
    const {token}=req.query;
        try {
        const payload=jwt.verify(token,process.env.JWT_SECRET)
        const user=await userModel.findOne({email:payload.email})
        if(!user)
        {
            res.status(200).json({
                message:"INVALID TOKEN",
                success:false,
                err:"user not found"
            })
        }
        user.verified=true;
        await user.save();
        const html = `
        <h1>Email Verified Successfully!</h1>
        <p>Your email has been verified. You can now log in to your account.</p>
        <a href="http://localhost:3000/login">Go to Login</a>
        `;
        return res.send(html);
        } catch (error) {
            res.status(400).json({
                message:"Invalid token",
                success:false,
                error:error.message,
            })
        }
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
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched)
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
            email:user.email,
            username:user.username
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
        message:"user details by shri ji",
        success:true,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}
export async function sendEmailAgain(req,res)
{
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