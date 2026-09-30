# TODO App

A full-stack TODO application with user authentication, profile image upload, and per-user task management.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express, MySQL, JWT, Multer

## Features

- User registration and login
- JWT-based protected todo APIs
- Create, list, and delete todos
- Priority levels for todos (High, Medium, Low)
- Optional profile image upload during registration

## Project Structure

```text
TODO/
├── backend/
└── frontend/
```

## Prerequisites

- Node.js (LTS recommended)
- npm
- MySQL Server

## Backend Setup

1. Go to backend:
   ```bash
   cd /home/runner/work/TODO/TODO/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update database credentials in:
   - `/home/runner/work/TODO/TODO/backend/database/database.js`
4. Make sure your MySQL database (for example `todo_app`) and required tables exist.
5. Start backend server:
   ```bash
   npm run dev
   ```

Backend runs on: `http://localhost:5000`

## Frontend Setup

1. Go to frontend:
   ```bash
   cd /home/runner/work/TODO/TODO/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start frontend:
   ```bash
   npm run dev
   ```

Frontend runs on Vite default URL (usually `http://localhost:5173`).

## API Endpoints

### Auth

- `POST /user/register`
- `POST /user/login`

### Todos (Protected, ****** required)

- `GET /api/get-todo`
- `POST /api/create-todo`
- `DELETE /api/delete-todo/:id`

## Notes

- Static uploads are served from backend `public/` directory.
- Frontend currently uses `http://localhost:5000` for API calls.

