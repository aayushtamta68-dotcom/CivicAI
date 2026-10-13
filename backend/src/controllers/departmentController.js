const departmentService = require("../services/departmentService");

async function getDepartments(req, res) {
    try {
        const departments = await departmentService.fetchDepartments();

        res.status(200).json({
            success: true,
            data: departments
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch departments."
        });
    }
}

module.exports = {
    getDepartments
};