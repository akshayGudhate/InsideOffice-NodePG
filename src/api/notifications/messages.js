require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

const SmsTemplates = require('./smsTemplates');

const router = express.Router();

/////////////////////////
//     send email      //
/////////////////////////

router.get('/sendSms', async (req, res) => {
    try {

        const mailingFunction = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const emailDetails = {
            from: process.env.EMAIL_ID,
            to: 'akshayg@npavinside.com',
            subject: 'mail testing via personal account!!',
            html: EmailTemplates.Test
        };

        await mailingFunction.sendMail(emailDetails);

        return res.status(200).json({
            info: 'Email sent successfully!!'
        });

    } catch (err) {
        return res.status(500).json({
            info: err.message
        });
    }
});




module.exports.router = router;