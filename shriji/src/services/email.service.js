import nodemailer from "nodemailer"
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.GOOGLE_USER,
        pass:process.env.GOOGLE_PASSWORD
    }
})
transporter.verify()
.then(()=>console.log("transporter is connected to server by shriji"))
.catch((err)=>console.log("error is",err))

export const sendEmail=async ({to,html,subject,text})=>
{
    try {
        await transporter.sendMail({
        from:process.env.GOOGLE_USER,
        to:to,
        subject:subject,
        html:html,
        text:text
        })
        console.log("email sent sucessfully by shri ji")
    } catch (err) {
        console.log('error is',err);
    }
}