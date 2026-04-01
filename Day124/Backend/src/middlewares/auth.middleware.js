import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
export async function authUser(req,res,next)
{
    const token=req.cookies.token;
    if(!token)
    {
        return res.status(401).json({
            message:"unauthorized",
            success:false,
            error:"no token provided"
        })
    }
    let payload=null;
    try {
        payload=jwt.verify(token,process.env.JWT_SECRET)
        req.user=payload;
        next()
    } catch (error) {
        return res.status(401).json({
            message:"unauthorized",
            success:false,
            error:"no token provided"
        })
    }
}