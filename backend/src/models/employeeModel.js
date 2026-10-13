const db = require("../config/db");

async function getDepartmentComplaints(department_id) {

    const [rows] = await db.execute(

        `SELECT
            c.complaint_id,
            c.title,
            c.description,
            c.location,
            c.image_path,
            c.priority,
            c.status,
            c.created_at,
            u.full_name AS citizen_name
        FROM complaints c
        JOIN users u
            ON c.citizen_id = u.user_id
        WHERE c.department_id = ?
        ORDER BY c.created_at DESC`,

        [department_id]

    );

    return rows;

}

async function getDepartmentComplaintDetails(complaint_id, department_id) {

    const [complaint] = await db.execute(

        `SELECT
            c.complaint_id,
            c.title,
            c.description,
            c.location,
            c.image_path,
            c.priority,
            c.status,
            c.created_at,
            u.full_name AS citizen_name
        FROM complaints c
        JOIN users u
            ON c.citizen_id = u.user_id
        WHERE c.complaint_id = ?
        AND c.department_id = ?`,

        [
            complaint_id,
            department_id
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

async function updateComplaintStatus(data) {

    const {
        complaint_id,
        employee_id,
        status,
        remarks
    } = data;

    const [rows] = await db.execute(

        `SELECT status
        FROM complaints
        WHERE complaint_id = ?`,

        [complaint_id]

    );

    if (rows.length === 0) {
        throw new Error("Complaint not found.");
    }

    const oldStatus = rows[0].status;

    if (oldStatus === status) {
        throw new Error(`Complaint is already '${status}'.`);
    }

    await db.execute(

        `UPDATE complaints
        SET status = ?
        WHERE complaint_id = ?`,

        [
            status,
            complaint_id
        ]

    );

    await db.execute(

        `INSERT INTO complaint_updates
        (
            complaint_id,
            employee_id,
            old_status,
            new_status,
            remarks
        )
        VALUES
        (
            ?, ?, ?, ?, ?
        )`,

        [
            complaint_id,
            employee_id,
            oldStatus,
            status,
            remarks
        ]

    );

    return true;

}

module.exports = {
    getDepartmentComplaints,
    getDepartmentComplaintDetails,
    updateComplaintStatus
};