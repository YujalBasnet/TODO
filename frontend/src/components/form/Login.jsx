
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await login(formData);

      navigate("/todo");
    } catch (error) {
      setError(error.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 flex items-center justify-center">

      <div className="w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl md:grid md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="relative hidden md:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-slate-900 p-10 lg:p-14 text-white">

          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-black/10" />

          {/* Logo */}
          <div className="relative z-10">

            <Link
              to="/"
              className="flex items-center gap-3 text-2xl font-bold"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-xl">
                ✓
              </span>

              Todo App
            </Link>

          </div>

          {/* Content */}
          <div className="relative z-10 my-12">

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-200">
              Welcome back
            </p>

            <h1 className="max-w-lg text-4xl font-bold leading-tight lg:text-5xl">
              Your tasks.
              <br />
              Your progress.
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-indigo-100">
              Log in to continue organizing your tasks and
              keeping your day on track.
            </p>

            {/* Features */}
            <div className="mt-8 space-y-4 text-sm text-indigo-100">

              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                  ✓
                </span>
                Manage your todos
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                  ✓
                </span>
                Set task priorities
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                  ✓
                </span>
                Stay organized
              </div>

            </div>

          </div>

          <p className="relative z-10 text-sm text-indigo-200">
            Simple tasks. Better productivity.
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="bg-slate-900 p-6 sm:p-10 lg:p-14">

          <div className="mx-auto max-w-md">

            {/* Mobile Logo */}
            <Link
              to="/"
              className="mb-8 flex items-center gap-3 text-xl font-bold text-white md:hidden"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                ✓
              </span>

              Todo App
            </Link>

            {/* Header */}
            <div className="mb-8">

              <p className="mb-2 text-sm font-semibold text-indigo-400">
                Welcome back
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-white">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Enter your details below to continue to your Todo App.
              </p>

            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />

              </div>

              {/* Password */}
              <div>

                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Password
                </label>

                <div className="relative">

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3.5 pr-20 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-slate-400 transition hover:bg-slate-700 hover:text-white"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <svg
                      className="mr-2 h-5 w-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />

                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>

                    Logging in...
                  </>
                ) : (
                  "Sign in"
                )}

              </button>

            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-slate-800" />

              <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                New here?
              </span>

              <div className="h-px flex-1 bg-slate-800" />

            </div>

            {/* Register */}
            <p className="text-center text-sm text-slate-400">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-semibold text-indigo-400 transition hover:text-indigo-300"
              >
                Create an account
              </Link>

            </p>

            {/* Back Home */}
            <div className="mt-8 text-center">

              <Link
                to="/"
                className="text-sm text-slate-500 transition hover:text-slate-300"
              >
                ← Back to Home
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;
