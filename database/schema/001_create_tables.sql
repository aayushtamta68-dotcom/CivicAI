-- =====================================================
-- CivicAI Database Schema
-- Version: 1.0
-- =====================================================

CREATE DATABASE IF NOT EXISTS civicai;
USE civicai;

-- ==========================
-- Departments
-- ==========================

CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- Users
-- ==========================

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL,

    role ENUM('Citizen','Employee') NOT NULL,

    department_id INT NULL,

    is_verified BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_department
        FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
        ON DELETE SET NULL
);

-- ==========================
-- Complaints
-- ==========================

CREATE TABLE complaints (

    complaint_id INT AUTO_INCREMENT PRIMARY KEY,

    citizen_id INT NOT NULL,

    department_id INT NOT NULL,

    title VARCHAR(200) NOT NULL,

    description TEXT NOT NULL,

    location VARCHAR(255) NOT NULL,

    priority ENUM('Low','Medium','High') DEFAULT 'Medium',

    status ENUM(
        'Submitted',
        'In Progress',
        'Resolved',
        'Rejected'
    ) DEFAULT 'Submitted',

    duplicate_of INT NULL,

    ai_confidence DECIMAL(5,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_complaint_user
        FOREIGN KEY (citizen_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_complaint_department
        FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_duplicate
        FOREIGN KEY (duplicate_of)
        REFERENCES complaints(complaint_id)
        ON DELETE SET NULL
);

-- ==========================
-- Complaint Updates
-- ==========================

CREATE TABLE complaint_updates (

    update_id INT AUTO_INCREMENT PRIMARY KEY,

    complaint_id INT NOT NULL,

    employee_id INT NOT NULL,

    old_status ENUM(
        'Submitted',
        'In Progress',
        'Resolved',
        'Rejected'
    ),

    new_status ENUM(
        'Submitted',
        'In Progress',
        'Resolved',
        'Rejected'
    ) NOT NULL,

    remarks TEXT,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_update_complaint
        FOREIGN KEY (complaint_id)
        REFERENCES complaints(complaint_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_update_employee
        FOREIGN KEY (employee_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- ==========================
-- Attachments
-- ==========================

CREATE TABLE attachments (

    attachment_id INT AUTO_INCREMENT PRIMARY KEY,

    complaint_id INT NOT NULL,

    file_name VARCHAR(255) NOT NULL,

    file_path VARCHAR(255) NOT NULL,

    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_attachment_complaint
        FOREIGN KEY (complaint_id)
        REFERENCES complaints(complaint_id)
        ON DELETE CASCADE
);

-- ==========================
-- OTP Verification
-- ==========================

CREATE TABLE otp_verifications (

    otp_id INT AUTO_INCREMENT PRIMARY KEY,

    email VARCHAR(150) NOT NULL,

    otp_code VARCHAR(6) NOT NULL,

    expires_at DATETIME NOT NULL,

    is_used BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);