import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="max-w-4xl w-full text-center">

        {/* Small Badge */}
        <div className="inline-block mb-6">
          <span className="px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-medium">
            ✨ Simple. Clean. Productive.
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Todo App
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed">
          Organize your daily tasks, manage your priorities,
          and stay focused on what matters most.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

          <Link
            to="/login"
            className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition duration-200 shadow-lg shadow-indigo-500/20"
          >
            Get Started
          </Link>

          <Link
            to="/register"
            className="px-8 py-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white font-semibold transition duration-200"
          >
            Create Account
          </Link>

        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5">

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-3xl mb-3">📝</div>

            <h3 className="text-lg font-semibold text-white">
              Create Tasks
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Quickly create and organize your daily todos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-3xl mb-3">🎯</div>

            <h3 className="text-lg font-semibold text-white">
              Set Priorities
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Keep track of what needs your attention first.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-3xl mb-3">🚀</div>

            <h3 className="text-lg font-semibold text-white">
              Stay Productive
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Manage your tasks and get things done efficiently.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Landing;