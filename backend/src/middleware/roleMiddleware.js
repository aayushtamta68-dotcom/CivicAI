const ApiError = require("../utils/ApiError");

function authorizeRoles(...roles) {

    return (req, res, next) => {

        if (!req.user) {
            return next(
                new ApiError(401, "Unauthorized.")
            );
        }

        if (!roles.includes(req.user.role)) {
            return next(
                new ApiError(
                    403,
                    "You do not have permission to access this resource."
                )
            );
        }

        next();

    };

}

module.exports = {
    authorizeRoles
};