const dashboardModel = require("../models/dashboardModel");

async function getDepartmentDashboard(user) {

    if (!user.department_id) {
        throw new Error("Employee department not found.");
    }

    return await dashboardModel.getDepartmentDashboard(
        user.department_id
    );

}

async function getCitizenDashboard(user) {

    return await dashboardModel.getCitizenDashboard(
        user.user_id
    );

}

module.exports = {
    getDepartmentDashboard,
    getCitizenDashboard
};