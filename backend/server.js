require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        project: "CivicAI",
        version: "1.0.0",
        status: "Running",
        message: "Welcome to the CivicAI Backend API"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 CivicAI Backend running on http://localhost:${PORT}`);
});