const departmentModel = require("../models/departmentModel");

async function fetchDepartments() {
    return await departmentModel.getAllDepartments();
}

module.exports = {
    fetchDepartments
};