const db = require("../config/db");

async function getAllDepartments() {
    const [rows] = await db.query(
        "SELECT department_id, department_name FROM departments ORDER BY department_name"
    );

    return rows;
}

module.exports = {
    getAllDepartments
};