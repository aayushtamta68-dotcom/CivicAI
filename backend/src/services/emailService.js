require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendOTP(email, otp) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error(
            "Email configuration missing: set EMAIL_USER and EMAIL_PASS in backend/.env."
        );
    }

    const mailOptions = {
        from: `"CivicAI" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "CivicAI Email Verification OTP",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
                <h2 style="color: #2563eb;">CivicAI</h2>
                <p>Your email verification OTP is:</p>
                <h1 style="letter-spacing: 6px;">${otp}</h1>
                <p>This OTP is valid for 10 minutes.</p>
                <p>Please do not share your OTP with anyone.</p>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("OTP email sent successfully:", info.messageId);
    } catch (error) {
        console.error("Email sending failed:", error.message);
        throw new Error("Unable to send verification email. Check your Gmail configuration.");
    }
}

module.exports = { sendOTP };
