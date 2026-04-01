import jwt from "jsonwebtoken"
export async function authUser(req,res,next)
{
    const token=req.cookies.token;
    let payload=null;
    try {
        payload=jwt.verify(token,process.env.JWT_SECRET);
        req.user=payload;
        next()
    } catch (error) {
        next(error)
    }
}