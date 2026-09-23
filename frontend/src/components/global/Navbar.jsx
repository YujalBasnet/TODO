import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="h-20 bg-amber-600 px-8 flex items-center justify-between">

      <Link to="/" className="text-3xl font-bold text-white">
        Todo App
      </Link>

      <div className="flex items-center gap-6">

        <NavLink
          to="/"
          className="text-white font-medium"
        >
          Home
        </NavLink>

        {user ? (
          <>
            <NavLink
              to="/todo"
              className="text-white font-medium"
            >
              Todo
            </NavLink>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;