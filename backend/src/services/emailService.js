const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendOTP(email, otp) {

    const mailOptions = {
        from: `"CivicAI" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "CivicAI Email Verification OTP",
        html: `
            <h2>CivicAI</h2>

            <p>Your OTP for email verification is:</p>

            <h1>${otp}</h1>

            <p>This OTP is valid for 10 minutes.</p>

            <p>Please do not share it with anyone.</p>
        `
    };

    try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
} catch (error) {
    console.error("Email sending failed:");
    console.error(error);
    throw error;
}
}

module.exports = {
    sendOTP
};