const nodemailer = require("nodemailer");

const sendemail = async ({ email, message, subject }) => {
    
    try {
        // CREATE TRANSPORTER
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        // DEFINE THE OPTIONS
        const emailoption = {
            from: 'Product suppport<support@productflex.com>',
            to: email,
            subject: subject,
            text: message
            // content: {
            //     if(content = forgotpassword) {
            //         message
            //     }, if(content = SignupOtp) {
            //         message
            //     }
            // },
        }
        await transporter.sendMail(emailoption);
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            message: value
        });
    }
}

module.exports = sendemail;