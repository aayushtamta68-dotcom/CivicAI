const authService = require("../services/authService");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
async function register(req, res, next) {
    try {
        const result = await authService.registerUser(req.body);

        return res.status(200).json(
            new ApiResponse(
                200,
                "OTP sent successfully.",
                result
            )
        );

    } catch (error) {
        next(new ApiError(400, error.message));
    }
}
async function verifyOTP(req, res, next) {
    try {
        const result = await authService.verifyOTP(req.body);

        return res.status(201).json(
            new ApiResponse(
                201,
                "Registration completed successfully.",
                result
            )
        );

    } catch (error) {
        next(new ApiError(400, error.message));
    }
}
async function login(req, res, next) {
    try {
        const result = await authService.loginUser(req.body);

        return res.status(200).json(
            new ApiResponse(
                200,
                "Login successful.",
                result
            )
        );

    } catch (error) {
        next(new ApiError(400, error.message));
    }
}
module.exports = {
    register,
    verifyOTP,
    login
};