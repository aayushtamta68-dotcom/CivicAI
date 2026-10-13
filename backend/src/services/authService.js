const bcrypt = require("bcrypt");

const authModel = require("../models/authModel");
const otpService = require("./otpService");
const emailService = require("./emailService");
const jwtService = require("./jwtService");

async function registerUser(data) {

    const {
        full_name,
        email,
        password
    } = data;

    const role = data.role || "Citizen";

    if (!full_name || !email || !password) {
        throw new Error("All fields are required.");
    }

    const existingUser = await authModel.findUserByEmail(email);

    if (existingUser) {
        throw new Error("Email already registered.");
    }

    const password_hash = await bcrypt.hash(password, 10);

    const otp = otpService.generateOTP();

    const expires_at = new Date(Date.now() + 10 * 60 * 1000);

    await authModel.saveOTP({
        full_name,
        email,
        password_hash,
        role,
        otp,
        expires_at
    });

    await emailService.sendOTP(email, otp);

    return {
        email
    };
}

async function verifyOTP(data) {

    const {
        email,
        otp
    } = data;

    if (!email || !otp) {
        throw new Error("Email and OTP are required.");
    }

    const otpRecord = await authModel.findOTP(email, otp);

    if (!otpRecord) {
        throw new Error("Invalid OTP.");
    }

    if (otpRecord.is_used) {
        throw new Error("OTP already used.");
    }

    if (new Date() > new Date(otpRecord.expires_at)) {
        throw new Error("OTP has expired.");
    }

    const userId = await authModel.createUser({
        full_name: otpRecord.full_name,
        email: otpRecord.email,
        password_hash: otpRecord.password_hash,
        role: otpRecord.role
    });

    await authModel.markOTPUsed(otpRecord.otp_id);

    return {
        user_id: userId
    };
}

async function loginUser(data) {

    const {
        email,
        password
    } = data;

    if (!email || !password) {
        throw new Error("Email and password are required.");
    }

    const user = await authModel.findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!passwordMatch) {
        throw new Error("Invalid email or password.");
    }

    const token = jwtService.generateToken(user);

    return {
        token,
        user: {
            user_id: user.user_id,
            full_name: user.full_name,
            email: user.email,
            role: user.role,
            department_id: user.department_id
        }
    };
}

module.exports = {
    registerUser,
    verifyOTP,
    loginUser
};