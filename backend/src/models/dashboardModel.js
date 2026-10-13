const db = require("../config/db");

async function getDepartmentDashboard(departmentId) {

    const [[stats]] = await db.query(
        `
        SELECT
            COUNT(*) AS total_complaints,
            SUM(status = 'Pending') AS pending,
            SUM(status = 'In Progress') AS in_progress,
            SUM(status = 'Resolved') AS resolved
        FROM complaints
        WHERE department_id = ?
        `,
        [departmentId]
    );

    return {
        total_complaints: Number(stats.total_complaints) || 0,
        pending: Number(stats.pending) || 0,
        in_progress: Number(stats.in_progress) || 0,
        resolved: Number(stats.resolved) || 0
    };

}

async function getCitizenDashboard(citizenId) {

    const [[stats]] = await db.query(
        `
        SELECT
            COUNT(*) AS total_complaints,
            SUM(status = 'Pending') AS pending,
            SUM(status = 'In Progress') AS in_progress,
            SUM(status = 'Resolved') AS resolved
        FROM complaints
        WHERE citizen_id = ?
        `,
        [citizenId]
    );

    const [recentComplaints] = await db.query(
        `
        SELECT
            complaint_id,
            title,
            status,
            created_at
        FROM complaints
        WHERE citizen_id = ?
        ORDER BY created_at DESC
        LIMIT 5
        `,
        [citizenId]
    );

    return {
        total_complaints: Number(stats.total_complaints) || 0,
        pending: Number(stats.pending) || 0,
        in_progress: Number(stats.in_progress) || 0,
        resolved: Number(stats.resolved) || 0,
        recentComplaints
    };

}

module.exports = {
    getDepartmentDashboard,
    getCitizenDashboard
};