import { validationResult } from "express-validator";

export async function validator(req,res,next)
{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            "sucess":false,
            "error":errors.array()
        })
    }
    next();
}