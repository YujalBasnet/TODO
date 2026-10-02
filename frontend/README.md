
# Todo App Frontend

A React-based frontend for managing personal tasks and todos. The application provides user authentication, protected routes, todo creation, searching, deleting, and a responsive user interface styled with Tailwind CSS.

## Features

- User registration and login
- JWT-based authentication
- Protected todo dashboard
- Create todos with:
  - Title
  - Description
  - Priority
  - Due date
  - Due time
- Fetch todos for the authenticated user
- Delete todos
- Search and filter todos
- Public landing and about pages
- Responsive design
- Reusable React components
- Client-side routing with React Router
- Icons with Lucide React

## Tech Stack

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- Lucide React
- Oxlint

## Project Structure

```text
frontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   └── form/
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── layout/
│   │   └── Home.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Landing.jsx
│   │   └── Todo.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Requirements

Make sure the following are installed:

- Node.js
- npm
- The Todo backend running locally

The frontend currently expects the backend API to be available at:

```text
http://localhost:5000
```

## Installation

From the repository root, navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

## Development

Start the Vite development server:

```bash
npm run dev
```

The application will be available at the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates a production build |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs Oxlint |

## Application Routes

| Route | Description | Access |
| --- | --- | --- |
| `/` | Landing page | Public |
| `/about` | About page | Public |
| `/login` | Login page | Public |
| `/register` | Registration page | Public |
| `/todo` | Todo dashboard | Authenticated users |

Authenticated users are redirected to `/todo` when attempting to access public authentication pages. Unauthenticated users are redirected to the landing page when attempting to access the todo dashboard.

## Authentication

The frontend uses React Context to manage authentication state.

After a successful login, the following values are stored in `localStorage`:

- `appUser` — The currently authenticated user
- `token` — The JWT authentication token

The token is sent with protected API requests using the `Authorization` header:

```text
Authorization: Bearer <token>
```

Logging out removes the stored user data and clears the current authentication state.

## Backend API Endpoints

The frontend communicates with the backend using Axios.

### Authentication

```text
POST http://localhost:5000/user/login
POST http://localhost:5000/user/register
```

### Todos

```text
GET    http://localhost:5000/api/get-todo
POST   http://localhost:5000/api/create-todo
DELETE http://localhost:5000/api/delete-todo/:id
```

Protected endpoints require a valid JWT token.

## Production Build

Create an optimized production build with:

```bash
npm run build
```

The generated files will be placed in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## Notes

- Start the backend server before using login, registration, or todo functionality.
- The current API URL is configured directly in the frontend source as `http://localhost:5000`.
- For deployment, consider moving the backend URL into a Vite environment variable such as `VITE_API_URL`.
- Do not commit sensitive credentials or tokens to the repository.
