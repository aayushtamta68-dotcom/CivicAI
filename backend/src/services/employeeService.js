const employeeModel = require("../models/employeeModel");

async function getDepartmentComplaints(user) {

    if (!user.department_id) {
        throw new Error("Employee department not found.");
    }

    return await employeeModel.getDepartmentComplaints(
        user.department_id
    );

}

async function getDepartmentComplaintDetails(user, complaintId) {

    if (!user.department_id) {
        throw new Error("Employee department not found.");
    }

    return await employeeModel.getDepartmentComplaintDetails(
        complaintId,
        user.department_id
    );

}

async function updateComplaintStatus(user, complaintId, data) {

    if (!user.department_id) {
        throw new Error("Employee department not found.");
    }

    const {
        status,
        remarks
    } = data;

    if (!status) {
        throw new Error("Status is required.");
    }

    await employeeModel.updateComplaintStatus({

        complaint_id: complaintId,

        employee_id: user.user_id,

        status,

        remarks: remarks || null

    });

    return {
        complaint_id: complaintId,
        status,
        remarks: remarks || null
    };

}

module.exports = {
    getDepartmentComplaints,
    getDepartmentComplaintDetails,
    updateComplaintStatus
};