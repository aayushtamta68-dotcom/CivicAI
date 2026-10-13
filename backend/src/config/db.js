const mysql = require("mysql2/promise");
require("dotenv").config();

const isCloudDatabase = process.env.DB_SSL === "true";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    ...(isCloudDatabase && {
        ssl: {
            minVersion: "TLSv1.2"
        }
    }),

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;