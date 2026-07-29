# CivicAI – Project Decisions

This document records important design decisions made during the development of CivicAI. The goal is to maintain consistency throughout the project and document the reasoning behind major architectural choices.

---

# Project Information

Project Name:
CivicAI

Subtitle:
AI-Powered Complaint Management System

Purpose:
To build an AI-assisted complaint management system where citizens can report civic issues and department employees can efficiently manage complaints.

---

# Design Principles

- Keep the project simple and easy to explain.
- Build a realistic workflow instead of an enterprise-scale system.
- Use AI to assist employees, not replace them.
- Maintain a clean and consistent user interface.
- Every feature should solve a real problem.

---

# Current Decisions

## Decision 1

Only two user roles will exist.

Roles:
- Citizen
- Employee

Reason:
An Admin role increases complexity without adding significant value for an internship-level project.

---

## Decision 2

Citizens will not select a department.

Reason:
Most citizens don't know which department is responsible.
The AI will automatically predict the correct department.

---

## Decision 3

The AI performs only three tasks.

- Department Prediction
- Priority Prediction
- Duplicate Detection

Reason:
These are meaningful AI features while keeping the system manageable.

---

## Decision 4

Citizens will not see the AI priority level.

Reason:
Priority is intended for employees to help them manage work.
Showing it to citizens could create confusion or unrealistic expectations.

---

## Decision 5

Employees only see complaints assigned to their own department.

Reason:
This reflects how organizations typically separate work between departments and keeps dashboards focused.

---

## Decision 6

The application will use a light theme.

Primary Color:
Blue

Secondary Color:
Green

Background:
White

Reason:
Government portals generally use clean, light interfaces that emphasize readability.

---

## Decision 7

The employee dashboard will use three complaint columns.

Columns:
- Submitted
- In Progress
- Resolved

Reason:
This provides a clear visual workflow without requiring a complex project management system.

---

## Decision 8

Email notifications will be sent for:

- Account Verification (OTP)
- Complaint Registration
- Complaint Status Updates

Reason:
Keeps citizens informed throughout the complaint lifecycle.

---

## Decision 9

Deployment Strategy

Development:
Localhost

Production:
Frontend → Vercel
Backend → Railway
AI Service → Railway
Database → Railway

Reason:
Fast local development with a publicly accessible deployed version for demonstrations.

---

# Future Decisions

Additional decisions will be documented here as the project evolves.