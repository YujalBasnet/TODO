# TODO Backend

Express.js backend for the TODO application. It provides user authentication, todo management, profile-image uploads, and AI-assisted parsing of natural-language todo descriptions.

## Features

- User registration and login
- Password hashing with `bcryptjs`
- JWT-based authentication
- MySQL database integration
- Create, read, and delete todos
- Per-user todo access control
- Profile-image uploads using `multer`
- AI-powered todo parsing with Google Gemini
- Static file serving for uploaded images
- CORS and JSON request support

## Tech Stack

- Node.js
- Express 5
- MySQL (`mysql2`)
- JSON Web Tokens (`jsonwebtoken`)
- `bcryptjs`
- `multer`
- Google Gemini via `@google/genai`

## Project Structure

```text
backend/
├── controllers/
│   ├── ai.js          # AI todo parsing logic
│   ├── auth.js        # Registration and login logic
│   └── todo.js        # Todo CRUD logic
├── database/
│   └── database.js    # MySQL connection
├── middleware/
│   ├── checkAuth.js   # JWT and role middleware
│   └── multer.js      # Profile-image upload configuration
├── public/
│   └── images/        # Uploaded profile images
├── routes/
│   ├── ai.routes.js   # AI endpoints
│   ├── todo.routes.js # Todo endpoints
│   └── user.route.js  # User endpoints
├── index.js           # Express application entry point
├── package.json
└── .env               # Local environment variables; not committed
```

## Prerequisites

- Node.js 18 or newer
- npm
- MySQL server
- A MySQL database named `todo_app`
- A Google Gemini API key for AI todo parsing

## Installation

From the `backend` directory:

```bash
npm install
```

Create the database required by the application:

```sql
CREATE DATABASE todo_app;
```

The application expects the following tables and columns to be available:

- `users`: user account information, including `id`, `name`, `email`, `phone`, `password`, and `role`
- `profile`: profile-image information, including `user_id` and `path`
- `todos`: todo information, including `id`, `user_id`, `title`, `description`, `priority`, `due_date`, and `due_time`

Create the upload directory if it does not already exist:

```bash
mkdir -p public/images
```

## Configuration

Create a `.env` file in the `backend` directory:

```env
GEMINI_API_KEY=your_gemini_api_key
```

The current database connection is configured in `database/database.js` for a local MySQL instance using:

- Host: `localhost`
- User: `root`
- Password: `1234`
- Database: `todo_app`

The current JWT signing key is defined in the authentication and middleware code. For production deployments, move database credentials and the JWT secret into environment variables before deploying.

## Running the Server

Start the development server with file watching enabled:

```bash
npm run dev
```

The server runs at:

```text
http://localhost:5000
```

The development command uses Node's `--env-file=.env` option and watches `index.js` for changes.

## API Endpoints

### User Authentication

#### Register

```http
POST /user/register
Content-Type: multipart/form-data
```

Form fields:

- `name` — required
- `email` — required
- `password` — required
- `phone` — optional
- `image` — optional profile image (`jpeg`, `jpg`, `png`, or `gif`, up to 10 MB)

#### Login

```http
POST /user/login
Content-Type: application/json
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "your-password"
}
```

The response contains a JWT token. Send it with protected requests using:

```http
Authorization: Bearer <token>
```

### Todos

All todo endpoints require authentication.

#### Get the authenticated user's todos

```http
GET /api/get-todo
Authorization: Bearer <token>
```

#### Create a todo

```http
POST /api/create-todo
Authorization: Bearer <token>
Content-Type: application/json
```

Request body:

```json
{
  "title": "Finish project documentation",
  "description": "Document the backend API",
  "priority": "High",
  "due_date": "2026-10-10",
  "due_time": "17:00:00"
}
```

`priority` should be one of `High`, `Medium`, or `Low`.

#### Delete a todo

```http
DELETE /api/delete-todo/:id
Authorization: Bearer <token>
```

### AI Todo Parsing

The AI endpoint requires authentication and a valid `GEMINI_API_KEY`.

```http
POST /api/ai/parse-todo
Authorization: Bearer <token>
Content-Type: application/json
```

Request body:

```json
{
  "text": "Remind me to submit the report tomorrow at 5 PM with high priority"
}
```

The endpoint returns structured todo data containing:

```json
{
  "title": "Submit the report",
  "description": "",
  "priority": "High",
  "due_date": "YYYY-MM-DD",
  "due_time": "17:00:00"
}
```

## Static Files

The backend serves the `public` directory as static content. Uploaded profile images are stored in `public/images` and can be accessed through the server's static-file route.

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts the server with Node watch mode and loads `.env` |
| `npm test` | Placeholder test script; tests are not currently configured |

## Security Notes

- Do not commit `.env` files or API keys.
- Replace hardcoded database credentials and JWT secrets with environment variables.
- Use a strong, private JWT secret in non-development environments.
- Configure CORS restrictions before deploying publicly.
- Validate uploaded files and request data on the server.
- Use HTTPS when sending authentication tokens over a network.

## Related Project

This backend is part of the [TODO repository](https://github.com/YujalBasnet/TODO), which also contains the frontend application.
