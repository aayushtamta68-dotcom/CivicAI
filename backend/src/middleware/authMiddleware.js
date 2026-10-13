const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

console.log("***** authMiddleware.js LOADED *****");

function verifyToken(req, res, next) {

    console.log("verifyToken() called");

    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(
            new ApiError(401, "Access denied. No token provided.")
        );
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("Decoded JWT:", decoded);

        req.user = decoded;

        next();

    } catch (error) {

        console.log("JWT ERROR:", error);

        next(
            new ApiError(401, "Invalid or expired token.")
        );

    }

}

function authorize(...roles) {

    return (req, res, next) => {

        console.log("authorize() called");
        console.log("Allowed Roles:", roles);
        console.log("User:", req.user);

        if (!req.user) {
            return next(
                new ApiError(401, "Unauthorized.")
            );
        }

        if (!roles.includes(req.user.role)) {
            return next(
                new ApiError(403, "Access denied.")
            );
        }

        next();

    };

}

module.exports = {
    verifyToken,
    authorize
};