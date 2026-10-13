-- =====================================================
-- CivicAI Database Schema
-- Version: 2.0
-- =====================================================

CREATE DATABASE IF NOT EXISTS civicai;
USE civicai;

-- =====================================================
-- Departments
-- =====================================================

CREATE TABLE IF NOT EXISTS departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE
);

-- =====================================================
-- Users
-- =====================================================

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Citizen','Employee') NOT NULL DEFAULT 'Citizen',
    department_id INT NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
        ON DELETE SET NULL
);

-- =====================================================
-- OTP Verification
-- =====================================================

CREATE TABLE IF NOT EXISTS otp_verifications (
    otp_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Citizen','Employee') DEFAULT 'Citizen',
    otp_code VARCHAR(6) NOT NULL,
    expires_at DATETIME NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Complaints
-- =====================================================

CREATE TABLE IF NOT EXISTS complaints (

    complaint_id INT AUTO_INCREMENT PRIMARY KEY,

    citizen_id INT NOT NULL,

    department_id INT NULL,

    title VARCHAR(200) NOT NULL,

    description TEXT NOT NULL,

    location VARCHAR(255) NOT NULL,

    image_path VARCHAR(255),

    priority ENUM(
        'Low',
        'Medium',
        'High'
    ) DEFAULT 'Medium',

    status ENUM(
        'Submitted',
        'In Progress',
        'Resolved',
        'Rejected'
    ) DEFAULT 'Submitted',

    ai_confidence DECIMAL(5,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (citizen_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
        ON DELETE SET NULL

);

-- =====================================================
-- Complaint Updates
-- =====================================================

CREATE TABLE IF NOT EXISTS complaint_updates (

    update_id INT AUTO_INCREMENT PRIMARY KEY,

    complaint_id INT NOT NULL,

    employee_id INT,

    status ENUM(
        'Submitted',
        'In Progress',
        'Resolved',
        'Rejected'
    ),

    remarks TEXT,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (complaint_id)
        REFERENCES complaints(complaint_id)
        ON DELETE CASCADE,

    FOREIGN KEY (employee_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL

);

-- =====================================================
-- Attachments
-- =====================================================

CREATE TABLE IF NOT EXISTS attachments (

    attachment_id INT AUTO_INCREMENT PRIMARY KEY,

    complaint_id INT NOT NULL,

    file_path VARCHAR(255) NOT NULL,

    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (complaint_id)
        REFERENCES complaints(complaint_id)
        ON DELETE CASCADE

);

-- =====================================================
-- Seed Departments
-- =====================================================

INSERT IGNORE INTO departments (department_name)
VALUES
('Roads'),
('Water Supply'),
('Electricity'),
('Sanitation');