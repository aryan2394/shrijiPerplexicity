import nodemailer from "nodemailer"
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.GOOGLE_USER,
        pass:process.env.GOOGLE_PASSWORD
    }
})
transporter.verify()
.then(()=>console.log("transporter is connected to server by shri ji"))
.catch((err)=>console.error("message is "+err.message))

export async function sendEmail({to,subject,html,text=""})
{
    const emailOptions={
        from:process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    }
    const send=transporter.sendMail(emailOptions);
    console.log("email sent by shri ji"+to);
}
