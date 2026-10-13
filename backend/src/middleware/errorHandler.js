const multer = require("multer");
const ApiError = require("../utils/ApiError");

module.exports = (err, req, res, next) => {

    console.log("========== ERROR ==========");
    console.log(err);
    console.log("===========================");

    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            success: false,
            message: err.message,
            code: err.code
        });
    }

    if (!(err instanceof ApiError)) {

        err = new ApiError(
            err.statusCode || 500,
            err.message || "Internal Server Error"
        );

    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });

};