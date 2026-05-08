# CRM Management System

## Project Overview

This is a full-stack CRM (Customer Relationship Management) system developed using React, Node.js, Express, PostgreSQL, and Sequelize ORM.

The system allows users to:
- Manage customer leads
- Track sales progress
- View CRM analytics
- Add notes to leads
- Search and filter leads
- Monitor deal values

The project also includes a modern futuristic dashboard UI.

---

# Tech Stack Used

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Recharts
- SweetAlert2

## Backend
- Node.js
- Express.js
- Sequelize ORM
- JWT Authentication
- bcryptjs

## Database
- PostgreSQL (Supabase)

## Deployment
- Frontend deployed on Vercel
- Backend deployed on Railway
- Database hosted on Supabase

---

# Features Implemented

- JWT-based login authentication
- Protected routes
- Create leads
- Edit leads
- Delete leads
- View lead details popup
- Search and filter leads
- Add notes to leads
- Dashboard analytics
- Pie chart and bar chart
- Responsive futuristic UI
- Logout confirmation popup

---

# How to Run Locally

## Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Environment Variables

## Backend `.env`

```env
PORT=5000

DB_HOST=aws-1-ap-southeast-2.pooler.supabase.com
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres.gghjaaaktyvozvkbmeei
DB_PASSWORD=Dinushika2685@

JWT_SECRET=dinushikanishadini
```

---

## Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```
```
I Also add .env file in repo
```
---

# Test Login Credentials

```text
Email: dinushika@gmail.com
Password: password123
```

---

# Database Setup

- PostgreSQL database hosted on Supabase
- Sequelize ORM used for database operations

Main tables:
- Users
- Leads
- Notes

---

# Known Limitations

- Single admin login only
- No role-based access control
- No email notifications
- No real-time updates
- No file upload support

---

# Reflection

This project helped me improve my skills in:
- Full-stack development
- REST API development
- JWT authentication
- PostgreSQL database management
- Cloud deployment
- Frontend and backend integration
- Modern UI/UX development

I also gained experience debugging deployment issues, API integration problems, and database connection errors.