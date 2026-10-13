const employeeService = require("../services/employeeService");
const ApiResponse = require("../utils/ApiResponse");

async function getDepartmentComplaints(req, res, next) {

    try {

        const complaints =
            await employeeService.getDepartmentComplaints(
                req.user
            );

        return res.json(

            new ApiResponse(
                200,
                "Department complaints fetched successfully.",
                complaints
            )

        );

    } catch (error) {

        next(error);

    }

}

async function getDepartmentComplaintDetails(req, res, next) {

    try {

        const complaint =
            await employeeService.getDepartmentComplaintDetails(

                req.user,

                req.params.id

            );

        return res.json(

            new ApiResponse(

                200,

                "Complaint details fetched successfully.",

                complaint

            )

        );

    } catch (error) {

        next(error);

    }

}

async function updateComplaintStatus(req, res, next) {

    try {

        const result =
            await employeeService.updateComplaintStatus(

                req.user,

                req.params.id,

                req.body

            );

        return res.json(

            new ApiResponse(

                200,

                "Complaint updated successfully.",

                result

            )

        );

    } catch (error) {

        next(error);

    }

}

module.exports = {
    getDepartmentComplaints,
    getDepartmentComplaintDetails,
    updateComplaintStatus
};