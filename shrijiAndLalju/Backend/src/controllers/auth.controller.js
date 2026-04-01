import userModel from "../models/user.model.js";
import { sendEmail } from "../services/email.service.js";
import jwt from "jsonwebtoken"
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

    const emailVerificationToken=jwt.sign(
       {
             email:user.email,
       },
       process.env.JWT_SECRET
    )
    // Send email in background without blocking the response

    // lets understand the flow of the code 
    // user wiil register and then now hum uspe ee mail bhejne ejismein ek link kpga and usmein ek a tak hoga jismein ki token hoga and
    // user uss link ko clcik karne pe ek /api hit karega that is /verify/email and waha pe se hum user ko find kar lege based on the token
    // and then jo bhi user hoga usko hum veirifed trye set kar denge 
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
        shriji:"user register by shri ji",
        success:true,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}
export async function verifyEmailController(req,res)
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
export async function loginController(req,res)
{
    const {email,password}=req.body;
    const user=await userModel.findOne({email})
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
export async function getMeController(req,res)
{
    const payload=req.user;
    const user=await userModel.findById(payload.id);
    res.status(200).json({
       user:{
         id:user._id,
        username:user.username,
        email:user.email
       }
    })
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