# TODO App

A full-stack task management application built with React, Vite, Express, MySQL, and Google Gemini. Users can create an account, log in, manage personal todo items, and use AI-assisted todo parsing.

## Features

- User registration and login
- Optional profile image upload during registration
- Protected todo management for authenticated users
- Create, view, and delete todo items
- AI-powered todo parsing through Google Gemini
- React client with route protection
- Responsive styling with Tailwind CSS
- REST API built with Express
- MySQL database integration

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- Lucide React
- Oxlint

### Backend

- Node.js
- Express
- MySQL2
- Google GenAI
- JSON Web Tokens
- bcryptjs
- Multer
- CORS

## Project Structure

```text
TODO/
├── backend/
│   ├── controllers/     # Authentication, todo, and AI controllers
│   ├── database/        # MySQL connection
│   ├── middleware/      # Authentication and file-upload middleware
│   ├── public/           # Backend-served public assets
│   ├── routes/           # User, todo, and AI API routes
│   ├── index.js          # Express server entry point
│   └── package.json
└── frontend/
    ├── public/           # Frontend public assets
    ├── src/
    │   ├── components/   # Shared and form components
    │   ├── context/      # Application state/context
    │   ├── layout/       # Shared layouts
    │   ├── pages/        # Landing, todo, and about pages
    │   ├── App.jsx       # Application routes
    │   └── main.jsx      # React entry point
    └── package.json
```

## Prerequisites

Before running the project, install:

- Node.js 20 or later
- npm
- MySQL
- A Google Gemini API key for AI todo parsing

## Installation

Clone the repository and install dependencies for both applications:

```bash
git clone https://github.com/YujalBasnet/TODO.git
cd TODO

cd backend
npm install

cd ../frontend
npm install
```

## Database Setup

1. Start MySQL locally.
2. Create a database named `todo_app`:

```sql
CREATE DATABASE todo_app;
```

3. Create the tables required by the controllers in `backend/controllers/`.
4. Update the MySQL connection settings in `backend/database/database.js` to match your local environment.

> Do not commit database passwords, JWT secrets, or API keys. Store sensitive values in environment variables and keep `.env` files out of version control.

## Environment Variables

Create a `.env` file inside `backend/` and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key
```

The backend currently starts with Node's environment-file support in development. If you move other configuration values into environment variables, update the database connection and authentication code accordingly.

## Running the Application

Open two terminal windows.

### Start the backend

```bash
cd backend
npm run dev
```

The API server runs at:

```text
http://localhost:5000
```

### Start the frontend

```bash
cd frontend
npm run dev
```

Vite will display the local frontend URL in the terminal, usually:

```text
http://localhost:5173
```

## Available API Routes

### User routes

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/user/register` | Register a new user; accepts an optional image upload |
| `POST` | `/user/login` | Log in an existing user |

### Todo routes

These routes require authentication.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/get-todo` | Get the authenticated user's todos |
| `POST` | `/api/create-todo` | Create a todo |
| `DELETE` | `/api/delete-todo/:id` | Delete a todo by ID |

### AI routes

This route requires authentication and uses Gemini to parse todo input.

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/ai/parse-todo` | Parse natural-language input into todo data |

## Frontend Routes

| Route | Description |
| --- | --- |
| `/` | Landing page |
| `/about` | About page |
| `/login` | Login page |
| `/register` | Registration page |
| `/todo` | Protected todo dashboard |

Unauthenticated users are redirected away from `/todo`, while authenticated users are redirected to the todo dashboard when visiting public authentication pages.

## Available Scripts

### Backend

```bash
npm run dev       # Start the backend with watch mode
```

### Frontend

```bash
npm run dev       # Start the Vite development server
npm run build     # Build the frontend for production
npm run lint      # Run Oxlint
npm run preview   # Preview the production build locally
```

## Security Notes

- Replace development database credentials before deploying.
- Use strong, unique secrets for JWT authentication.
- Keep `GEMINI_API_KEY` and other secrets in environment variables.
- Configure CORS for trusted frontend origins in production.
- Validate and sanitize all request data before persisting it.

## Contributing

1. Create a feature branch.
2. Make your changes.
3. Run the frontend lint and build commands.
4. Test the backend and database integration locally.
5. Open a pull request with a clear description of the changes.

## License

No license has been specified for this repository yet.
