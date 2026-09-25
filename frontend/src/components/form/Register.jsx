
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all the fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/user/register",
        {
          name: name,
          email: email,
          password: password,
        }
      );

      console.log("Registration successful:", response.data);

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to create your account. Please try again."
      );
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

          <div className="relative z-10 my-12">

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-200">
              Get organized
            </p>

            <h1 className="max-w-lg text-4xl font-bold leading-tight lg:text-5xl">
              Stay focused.
              <br />
              Get things done.
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-indigo-100">
              Create your account and start managing your tasks
              in one simple and organized place.
            </p>

            <div className="mt-8 space-y-4 text-sm text-indigo-100">

              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                  ✓
                </span>
                Organize your daily tasks
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                  ✓
                </span>
                Set priorities for your work
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                  ✓
                </span>
                Keep everything in one place
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
                Create your account
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-white">
                Welcome aboard 👋
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Create an account to start managing your todos.
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

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  autoComplete="name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>

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
                    placeholder="Create a password"
                    autoComplete="new-password"
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

                <p className="mt-2 text-xs text-slate-500">
                  Use at least 6 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Confirm password
                </label>

                <div className="relative">

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3.5 pr-20 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-slate-400 transition hover:bg-slate-700 hover:text-white"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>

                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">

                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
                />

                <label
                  htmlFor="terms"
                  className="text-xs leading-5 text-slate-400"
                >
                  I agree to the{" "}
                  <button
                    type="button"
                    className="font-medium text-indigo-400 hover:text-indigo-300"
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="font-medium text-indigo-400 hover:text-indigo-300"
                  >
                    Privacy Policy
                  </button>
                  .
                </label>

              </div>

              {/* Submit */}
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

                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}

              </button>

            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-slate-800" />

              <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Already a member?
              </span>

              <div className="h-px flex-1 bg-slate-800" />

            </div>

            {/* Login */}
            <p className="text-center text-sm text-slate-400">

              Already have an account?{" "}

              <Link
                to="/login"
                className="font-semibold text-indigo-400 transition hover:text-indigo-300"
              >
                Sign in
              </Link>

            </p>

            <p className="mt-8 text-center text-xs leading-5 text-slate-600">
              By creating an account, you agree to our terms and privacy
              policy.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;
