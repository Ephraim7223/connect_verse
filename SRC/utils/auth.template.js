import { mailTransport } from "../config/mailer.js"
import { mailGenerator } from "../config/mailgen.js"
import dotenv from 'dotenv'
dotenv.config()

export const registrationMail = async (email, userName) => {
    const supportTeam = 'dyceiskheeng@gmail.com'
    const html = {
        body: {
            signature: false,
            greeting: `Dear ${userName}`,
            intro: 'Welcome to our app. We hope you enjoy it.',
            outro: [
                `If you did not sign up, please contact our support team at ${supportTeam} for verification.`
            ]
        }
    }

    const template = mailGenerator.generate(html)

    if (!template) {
        console.log("Failed to generate HTML template");
        return;
    }

    const mail = {
        to: email,
        from: 'ephraimjerome81@gmail.com',
        subject: 'Successful registration',
        html: template
    }

    // Send mail using mailTransport - fixed parameter order
    return mailTransport(mail.to, mail.from, mail.subject, mail.html)
}