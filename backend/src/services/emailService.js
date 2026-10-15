
require("dotenv").config();

async function sendOTP(email, otp) {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM;

    if (!apiKey || !from) {
        throw new Error(
            "Email configuration missing: set RESEND_API_KEY and EMAIL_FROM."
        );
    }

    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            from,
            to: [email],
            subject: "CivicAI Email Verification OTP",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
                    <h2 style="color: #2563eb;">CivicAI</h2>
                    <p>Your email verification OTP is:</p>
                    <h1 style="letter-spacing: 6px;">${otp}</h1>
                    <p>This OTP is valid for 10 minutes.</p>
                    <p>If you did not request this code, you can ignore this email.</p>
                    <p>Please do not share your OTP with anyone.</p>
                </div>
            `
        })
    });

    const result = await response.json();

    if (!response.ok) {
        console.error("Resend email API error:", result);
        throw new Error(
            result.message || "Unable to send verification email."
        );
    }

    console.log("OTP email accepted by Resend:", result.id);
}

module.exports = { sendOTP };
