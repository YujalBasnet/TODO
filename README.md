# Todo App

A full-stack Todo application built with React (Vite) on the frontend and Express.js on the backend. It supports user registration/login, JWT-based authentication, and CRUD operations for todos using a MySQL database.

## Features

- User registration and login
- JWT-based authentication
- Create, list, and delete todo items
- Priority selection for each task
- Responsive frontend interface
- Separate frontend and backend architecture

## Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MySQL
- JWT
- bcryptjs
- multer

## Project Structure

```text
TODO/
├── backend/
│   ├── controllers/
│   │   ├── auth.js
│   │   └── todo.js
│   ├── database/
│   │   └── database.js
│   ├── middleware/
│   │   ├── checkAuth.js
│   │   └── multer.js
│   ├── routes/
│   │   ├── todo.routes.js
│   │   └── user.route.js
│   ├── public/
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── .oxlintrc.json
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── README.md
└── README.md
```

## Prerequisites

Before running this project, make sure you have:

- Node.js installed
- MySQL installed and running
- npm or yarn available

## Database Setup

Create a MySQL database named `todo_app`.

The backend connection is configured in:

```js
backend/database/database.js
```

Update the credentials if needed:

```js
const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'todo_app',
});
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/YujalBasnet/TODO.git
cd TODO
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Running the Application

### Start the backend

```bash
cd backend
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### Start the frontend

```bash
cd frontend
npm run dev
```

The frontend runs in development mode using Vite and is usually available at:

```text
http://localhost:5173
```

## API Endpoints

### User routes

- `POST /user/register`
- `POST /user/login`

### Todo routes

- `GET /api/get-todo`
- `POST /api/create-todo`
- `DELETE /api/delete-todo/:id`

All todo routes require authentication via a bearer token.

## Authentication Flow

- User registers via `/user/register`
- User logs in via `/user/login`
- The backend returns a JWT token
- The frontend stores the token in `localStorage`
- Protected API requests include the token in the `Authorization` header

## Notes

- This app uses local storage for client-side token handling.
- The backend serves static files from the `backend/public` directory.
- The frontend is a Vite React app and uses React Router for navigation.

## License

This project is currently provided as a learning/demo project without an explicit license.

## Author

Yujal Basnet

## Contributing

Contributions are welcome. Feel free to fork the repository and submit pull requests with improvements or bug fixes.
