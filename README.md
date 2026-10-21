# CivicAI — AI-Powered Complaint Management System

CivicAI is a full-stack web application for submitting and tracking civic complaints. It uses a React frontend, an Express API, a Flask-based complaint classification service, and MySQL.

## Features
- Citizen registration with email OTP verification and login
- Submit and track civic complaints
- AI-assisted department classification and priority prediction
- Staff-facing complaint management and status updates
- Dashboard views and optional complaint image uploads
- Email OTP verification through Gmail SMTP

## Tech stack
- **Frontend:** React, Vite, React Router, Axios, Tailwind CSS
- **Backend:** Node.js, Express, MySQL (`mysql2`), JWT authentication
- **AI service:** Python, Flask
- **Database:** MySQL
- **Email:** Nodemailer + Gmail App Password

> The current AI service uses keyword-based rules for complaint classification and priority prediction. It is a lightweight local service, not a hosted AI model.

## Requirements
- Git
- Node.js (current LTS recommended) and npm
- Python 3.10+ and pip
- MySQL Server (MySQL Workbench is optional)
- Gmail with 2-Step Verification if using email OTP registration

## 1. Clone the repository
```powershell
git clone https://github.com/aayushtamta68-dotcom/CivicAI.git
cd CivicAI
```

## 2. Create the database
1. Start MySQL Server.
2. Connect to your local MySQL instance using Workbench or the MySQL CLI.
3. Execute `database/schema/001_create_tables.sql`.
4. Confirm the `civicai` database and tables were created.

## 3. Configure the backend
Copy the example file:
```powershell
Copy-Item backend/.env.example backend/.env
```
Edit `backend/.env` and replace placeholders with your local MySQL credentials, a long random `JWT_SECRET`, and Gmail credentials.

- `AI_SERVICE_URL=http://127.0.0.1:5001`
- `EMAIL_USER` is your Gmail address.
- `EMAIL_PASS` must be a Gmail App Password, not your normal Gmail password.
- Create an App Password at https://myaccount.google.com/apppasswords after enabling 2-Step Verification.

Install backend dependencies:
```powershell
cd backend
npm install
cd ..
```

## 4. Configure the frontend
The frontend defaults to `http://localhost:5000`. To set it explicitly:
```powershell
Copy-Item frontend/.env.example frontend/.env
```
Install frontend dependencies:
```powershell
cd frontend
npm install
cd ..
```

## 5. Set up the Python AI service
From the project root:
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r ai-service/requirements.txt
```
If PowerShell blocks activation, run `\.venv\Scripts\python.exe` directly in place of `python`.

## 6. Start CivicAI
Start MySQL, then keep three terminals open.

**Terminal 1 — AI service** (project root; activate `.venv` first):
```powershell
python ai-service/app.py
```
Default address: http://localhost:5001

**Terminal 2 — Backend API:**
```powershell
cd backend
npm run dev
```
Default address: http://localhost:5000

**Terminal 3 — Frontend:**
```powershell
cd frontend
npm run dev
```
Open the URL printed by Vite, usually http://localhost:5173.

## Environment variables

| Variable | Purpose |
|---|---|
| `DB_HOST` | Local MySQL host, usually `localhost` |
| `DB_PORT` | MySQL port, usually `3306` |
| `DB_USER` / `DB_PASSWORD` | Local MySQL credentials |
| `DB_NAME` | Database name, usually `civicai` |
| `DB_SSL` | Set `true` only if your database requires TLS |
| `JWT_SECRET` | Secret used to sign authentication tokens |
| `PORT` | Optional Express port; defaults to `5000` |
| `AI_SERVICE_URL` | Flask AI service; normally `http://127.0.0.1:5001` |
| `EMAIL_USER` / `EMAIL_PASS` | Gmail address and App Password for OTP emails |
| `VITE_API_URL` | Frontend API URL; defaults to `http://localhost:5000` |

Never commit `.env` files, real passwords, tokens, or API keys. Only commit example files containing placeholders.

## Troubleshooting
- **Frontend cannot reach the API:** ensure the backend is running on port 5000 and `VITE_API_URL` points to it.
- **AI classification fails:** start Flask and verify `AI_SERVICE_URL` in `backend/.env`.
- **Database connection fails:** start MySQL, verify credentials, and execute the schema.
- **OTP email fails:** use a Gmail App Password; check spam and backend terminal output.
- **Port already in use:** stop the process using the port or consistently configure another port.

## Project structure
```text
CivicAI/
├── ai-service/       # Flask complaint classification service
├── backend/          # Express API, routes, services, database access
├── database/schema/  # MySQL schema and seed departments
└── frontend/         # React + Vite UI
```

## Security and scope
This project is intended for development and demonstration. Before production use, review authorization, input validation, rate limiting, secure email delivery, uploads, and database security. Do not expose development credentials or run development servers as public production services.

## License
No license has been specified. Add an open-source license if you want to define permissions for reuse, modification, and redistribution.
