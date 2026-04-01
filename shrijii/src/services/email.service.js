import nodemailer from "nodemailer"
const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.GOOGLE_USER,
        pass:process.env.GOOGLE_PASSWORD
    }
})
transport.verify()
.then(()=>console.log("transporter is connected and ready to mail by shri"))
.catch((err)=>console.log("error is",err));

export const sendEmail=async ({subject,to,html,text=" "})=>
{
    try {
        await transport.sendMail({
            from:process.env.GOOGLE_USER,
            to:to,
            subject:subject,
            html:html,
            text:text
        })
    } catch (error) {
        console.log("error is",error)
    }
}