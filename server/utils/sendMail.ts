require("dotenv").config()
import nodemailer,{Transporter} from "nodemailer"
import ejs from "ejs"
import path from "path"
import exp from "constants";

interface emailOption{
    email:string;
    subject:string;
    template:string;
    data:{
        [key:string]:any
    }
}

const sendMail=async (options:emailOption):Promise<void>=> {
    const transporter:Transporter=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:parseInt(process.env.SMTP_PORT||'587'),
        service:process.env.SERVICE,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD
        }
    });

    const {email,subject,template,data}=options

    //get the path to the email template
    const templatePath=path.join(__dirname,"../mails",template)

    //render the email template with ejs
    const html:string=await ejs.renderFile(templatePath,data)

    const mailOptions={
        from:process.env.SMTP_MAIL,
        to:email,
        subject,
        html 
    }

    await transporter.sendMail(mailOptions)
}

export default sendMail