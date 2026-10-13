const complaintModel = require("../models/complaintModel");
const aiService = require("./aiService");

async function createComplaint(data) {

    const {
        citizen_id,
        title,
        description,
        location,
        image
    } = data;

    if (!title || !description || !location) {
        throw new Error("All fields are required.");
    }

    const aiResult = await aiService.predictComplaint(
        title,
        description
    );

    const complaintId = await complaintModel.createComplaint({

        citizen_id,
        title,
        description,
        location,
        image,

        department: aiResult.department,
        priority: aiResult.priority,
        confidence: aiResult.confidence

    });

    return {

        complaint_id: complaintId,
        ai_prediction: aiResult

    };

}

async function getCitizenComplaints(user) {

    return await complaintModel.getCitizenComplaints(
        user.user_id
    );

}

async function getComplaintDetails(user, complaintId) {

    return await complaintModel.getComplaintDetails(

        complaintId,

        user.user_id

    );

}

module.exports = {
    createComplaint,
    getCitizenComplaints,
    getComplaintDetails
};