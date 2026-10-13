const express = require("express");

const dashboardController = require("../controllers/dashboardController");

const {
    verifyToken,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================
// Employee Dashboard
// ==========================

router.get(
    "/",
    verifyToken,
    authorize("Employee"),
    dashboardController.getDepartmentDashboard
);

// ==========================
// Citizen Dashboard
// ==========================

router.get(
    "/citizen",
    verifyToken,
    authorize("Citizen"),
    dashboardController.getCitizenDashboard
);

module.exports = router;