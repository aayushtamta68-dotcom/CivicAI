const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/db");
const departmentRoutes = require("./routes/departmentRoutes");
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const errorHandler = require("./middleware/errorHandler");
const app = express();
app.use(cors());
app.use(express.json());
app.use(
    "/uploads",
    express.static(path.join(__dirname, "../uploads"))
);

app.use("/api/departments", departmentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/dashboard", dashboardRoutes);
(async () => {

    try {

        const connection = await db.getConnection();

        console.log("✅ Connected to MySQL Database");

        connection.release();

    } catch (error) {

        console.error(error.message);

    }

})();
app.get("/", (req, res) => {

    res.json({

        success: true,
        project: "CivicAI",
        status: "Backend Running Successfully"

    });

});
app.use(errorHandler);
module.exports = app;