const dashboardService = require("../services/dashboardService");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

async function getDepartmentDashboard(req, res, next) {

    try {

        const result = await dashboardService.getDepartmentDashboard(
            req.user
        );

        return res.status(200).json(

            new ApiResponse(

                200,

                "Dashboard statistics fetched successfully.",

                result

            )

        );

    } catch (error) {

        next(new ApiError(400, error.message));

    }

}

async function getCitizenDashboard(req, res, next) {

    try {

        const result = await dashboardService.getCitizenDashboard(
            req.user
        );

        return res.status(200).json(

            new ApiResponse(

                200,

                "Citizen dashboard fetched successfully.",

                result

            )

        );

    } catch (error) {

        next(new ApiError(400, error.message));

    }

}

module.exports = {
    getDepartmentDashboard,
    getCitizenDashboard
};