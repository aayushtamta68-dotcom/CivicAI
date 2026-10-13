const express = require("express");

const router = express.Router();

const employeeController = require("../controllers/employeeController");

const authMiddleware = require("../middleware/authMiddleware");

router.get(

    "/complaints",

    authMiddleware.verifyToken,

    authMiddleware.authorize("Employee"),

    employeeController.getDepartmentComplaints

);

router.get(

    "/complaints/:id",

    authMiddleware.verifyToken,

    authMiddleware.authorize("Employee"),

    employeeController.getDepartmentComplaintDetails

);

router.put(

    "/complaints/:id",

    authMiddleware.verifyToken,

    authMiddleware.authorize("Employee"),

    employeeController.updateComplaintStatus

);

module.exports = router;