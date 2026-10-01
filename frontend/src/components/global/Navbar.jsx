import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="h-20 bg-amber-600 px-8 flex items-center justify-between">

      <div className="text-3xl font-bold text-white">
        Todo App
      </div>

      <div className="flex items-center gap-6">
      {! currentUser && (
        <>
          <NavLink to="/" className="text-white">
            Home
          </NavLink>

          <NavLink to ="/about" className="text-white">
            About
          </NavLink>
        </>
      )}

        {currentUser ? (
          <>
            <NavLink to="/todo" className="text-white">
              Todo
            </NavLink>

            <span className="text-white font-medium">
              Hi, {currentUser.name}
            </span>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-4 py-2 text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="rounded-lg bg-blue-500 px-4 py-2 text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-green-500 px-4 py-2 text-white"
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