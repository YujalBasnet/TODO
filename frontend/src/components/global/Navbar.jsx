import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `font-medium transition ${
      isActive
        ? "text-white border-b-2 border-white pb-1"
        : "text-white hover:text-amber-200"
    }`;

  return (
    <nav className="flex h-20 items-center justify-between bg-amber-600 px-6 shadow-md">

      {/* Logo */}
      <Link to="/" className="text-3xl font-bold text-white">
        FakeStore
      </Link>

      {/* Navigation */}
      <ul className="flex items-center gap-6">
        <li>
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
        </li>
      </ul>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="rounded-md bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
        >
          Register
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;