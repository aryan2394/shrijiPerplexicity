import nodemailer from "nodemailer"
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        type:"OAuth2",
        user:process.env.GOOGLE_USER,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        refreshToken:process.env.GOOGLE_REFRESH_TOKEN,
        clientId:process.env.GOOGLE_CLIENT_ID
    }
})
transporter.verify()
.then(()=>console.log("email transporter is ready to send emails by shri ji"))
.catch((err)=>console.log("email transproter failed",err))

export async function sendEmail({to,subject,html,text})
{
    // dekho aap kabhi koi bhi mail inspect karoge th wo humara html format mein hi rahta hai aap text mein bhejoge toh wo content html mein convert ho jaata hai 
    // to:kisko bheja hai ,
    // subject:kya hai email ka
    // text:content kya hai 
    const mailOptions={
        from:process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    }
    const details=await transporter.sendMail(mailOptions);
    console.log("email sent by shri ji",details)
}

