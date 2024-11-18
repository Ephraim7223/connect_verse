import dotenv from 'dotenv'
dotenv.config()

import { google } from 'googleapis'
import { createTransport } from 'nodemailer'
const OAuth2 = google.auth.OAuth2

const {CLIENT_ID, ACCESS_TOKEN, CLIENT_SECRET, REDIRECT_URL, REFRESH_TOKEN, GMAIL_NAME} = process.env

// console.log({
//     CLIENT_ID, ACCESS_TOKEN, CLIENT_SECRET, REDIRECT_URL, REFRESH_TOKEN
// });


const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
oauth2Client.setCredentials({refresh_token : REFRESH_TOKEN})

const smtpTransport = createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: GMAIL_NAME,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN
    },
    tls: {
        rejectUnauthorized: false
    }
})

export const mailTransport = async(to, subject ,html,) => {
    const from  = GMAIL_NAME
    console.log(`sending mail to: ${to}`);
    
    const mailOptions = {to, subject ,html, from}

    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mailOptions,(err, info) => {
            if (err) {
                return reject(err)
            }
            console.log(`mail successfully sent to ${to} ${info.response}`);
            resolve(info)
        })
    })
}