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

  const navLinkClass = ({ isActive }) =>
    `relative text-xs font-mono uppercase tracking-[0.2em] transition duration-300 ${
      isActive
        ? "text-slate-100"
        : "text-slate-500 hover:text-slate-200"
    }`;

  return (
    <nav className="relative z-50 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10 md:px-16">

        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-sm font-bold text-slate-300 transition duration-300 group-hover:border-slate-500 group-hover:text-white">
            ✓
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-200">
              Todo
            </span>

            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-slate-600">
              Stay Focused
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-5 sm:gap-7">

          {!currentUser && (
            <>
              <NavLink
                to="/"
                className={navLinkClass}
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className={navLinkClass}
              >
                About
              </NavLink>
            </>
          )}

          {currentUser ? (
            <>
              <NavLink
                to="/todo"
                className={navLinkClass}
              >
                Todo
              </NavLink>

              {/* User */}
              <div className="hidden items-center gap-3 border-l border-slate-800 pl-6 sm:flex">

                <div className="h-7 w-7 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center text-xs font-semibold text-slate-400">
                  {currentUser.name?.charAt(0).toUpperCase()}
                </div>

                <span className="text-xs font-mono uppercase tracking-[0.12em] text-slate-400">
                  Hi, {currentUser.name}
                </span>

              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-mono uppercase tracking-[0.15em] text-slate-400 transition duration-300 hover:border-slate-500 hover:bg-slate-800 hover:text-slate-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                to="/login"
                className="hidden text-xs font-mono uppercase tracking-[0.2em] text-slate-500 transition duration-300 hover:text-slate-200 sm:block"
              >
                Login
              </Link>

              {/* Register */}
              <Link
                to="/register"
                className="rounded-lg border border-slate-600 bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-950 transition duration-300 hover:bg-white hover:shadow-lg hover:shadow-slate-500/10"
              >
                Get Started
              </Link>
            </>
          )}

        </div>

      </div>

      {/* Bottom glow line */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-500/30 to-transparent" />

    </nav>
  );
};

export default Navbar;