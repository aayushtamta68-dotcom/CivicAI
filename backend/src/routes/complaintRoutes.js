const express = require("express");

const router = express.Router();

const complaintController = require("../controllers/complaintController");

const { verifyToken } = require("../middleware/authMiddleware");

const { authorizeRoles } = require("../middleware/roleMiddleware");

const upload = require("../config/multer");

router.post(
    "/",
    verifyToken,
    authorizeRoles("Citizen"),
    upload.single("image"),
    complaintController.createComplaint
);

router.get(
    "/my",
    verifyToken,
    authorizeRoles("Citizen"),
    complaintController.getCitizenComplaints
);

router.get(
    "/:id",
    verifyToken,
    authorizeRoles("Citizen"),
    complaintController.getComplaintDetails
);

module.exports = router;