const db = require("../config/db");

async function createComplaint(data) {

    const {
        citizen_id,
        title,
        description,
        location,
        image,
        department,
        priority,
        confidence
    } = data;

    const [departmentRow] = await db.execute(

        "SELECT department_id FROM departments WHERE department_name = ?",

        [department]

    );

    const department_id =
        departmentRow.length > 0
            ? departmentRow[0].department_id
            : null;

    const [result] = await db.execute(

        `INSERT INTO complaints
        (
            citizen_id,
            department_id,
            title,
            description,
            location,
            image_path,
            priority,
            ai_confidence
        )
        VALUES
        (
            ?, ?, ?, ?, ?, ?, ?, ?
        )`,

        [
            citizen_id,
            department_id,
            title,
            description,
            location,
            image,
            priority,
            confidence
        ]

    );

    return result.insertId;

}

async function getCitizenComplaints(citizen_id) {

    const [rows] = await db.execute(

        `SELECT
            c.complaint_id,
            c.title,
            c.description,
            c.location,
            c.image_path,
            d.department_name,
            c.priority,
            c.status,
            c.created_at
        FROM complaints c
        LEFT JOIN departments d
        ON c.department_id = d.department_id
        WHERE c.citizen_id = ?
        ORDER BY c.created_at DESC`,

        [citizen_id]

    );

    return rows;

}

async function getComplaintDetails(complaint_id, citizen_id) {

    const [complaint] = await db.execute(

        `SELECT
            c.complaint_id,
            c.title,
            c.description,
            c.location,
            c.image_path,
            d.department_name,
            c.priority,
            c.status,
            c.created_at
        FROM complaints c
        LEFT JOIN departments d
        ON c.department_id = d.department_id
        WHERE c.complaint_id = ?
        AND c.citizen_id = ?`,

        [
            complaint_id,
            citizen_id
        ]

    );

    if (complaint.length === 0) {
        throw new Error("Complaint not found.");
    }

    const [updates] = await db.execute(

        `SELECT
            old_status,
            new_status,
            remarks,
            updated_at
        FROM complaint_updates
        WHERE complaint_id = ?
        ORDER BY updated_at ASC`,

        [complaint_id]

    );

    return {
        complaint: complaint[0],
        updates
    };

}

module.exports = {
    createComplaint,
    getCitizenComplaints,
    getComplaintDetails
};