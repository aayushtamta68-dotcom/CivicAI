const db = require("../config/db");

async function findUserByEmail(email) {
    const [rows] = await db.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows[0];
}

async function saveOTP(data) {

    const {
        full_name,
        email,
        password_hash,
        role,
        otp,
        expires_at
    } = data;

    await db.execute(
        "DELETE FROM otp_verifications WHERE email = ?",
        [email]
    );

    await db.execute(
        `INSERT INTO otp_verifications
        (email, full_name, password_hash, role, otp_code, expires_at)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            email,
            full_name,
            password_hash,
            role,
            otp,
            expires_at
        ]
    );
}

async function findOTP(email, otp) {

    const [rows] = await db.execute(
        `SELECT *
        FROM otp_verifications
        WHERE email = ?
        AND otp_code = ?`,
        [email, otp]
    );

    return rows[0];
}

async function createUser(data) {

    const {
        full_name,
        email,
        password_hash,
        role
    } = data;

    const [result] = await db.execute(
        `INSERT INTO users
        (full_name, email, password_hash, role, is_verified)
        VALUES (?, ?, ?, ?, ?)`,
        [
            full_name,
            email,
            password_hash,
            role,
            true
        ]
    );

    return result.insertId;
}

async function markOTPUsed(id) {

    await db.execute(
        `UPDATE otp_verifications
        SET is_used = 1
        WHERE otp_id = ?`,
        [id]
    );
}

module.exports = {
    findUserByEmail,
    saveOTP,
    findOTP,
    createUser,
    markOTPUsed
};