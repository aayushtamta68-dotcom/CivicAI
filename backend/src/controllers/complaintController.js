const complaintService = require("../services/complaintService");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
async function createComplaint(req, res, next) {
    try {
        const result = await complaintService.createComplaint({
            citizen_id: req.user.user_id,
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            image: req.file ? req.file.filename : null
        });
        return res.status(201).json(
            new ApiResponse(
                201,
                "Complaint created successfully.",
                result
            )
        );
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}
async function getCitizenComplaints(req, res, next) {
    try {
        const complaints = await complaintService.getCitizenComplaints(
            req.user
        );
        return res.json(
            new ApiResponse(

                200,
                "Complaints fetched successfully.",
                complaints
            )
        );
    } catch (error) {
        next(new ApiError(400, error.message));
    }
}
async function getComplaintDetails(req, res, next) {
    try {
        const complaint = await complaintService.getComplaintDetails(
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
        next(new ApiError(404, error.message));
    }
}
module.exports = {
    createComplaint,
    getCitizenComplaints,
    getComplaintDetails
};