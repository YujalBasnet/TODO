import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Todo() {
  const { currentUser } = useContext(AuthContext);

  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  // Mouse glow
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    opacity: 0,
  });

  // Search
  const [search, setSearch] = useState("");

  // -----------------------------
  // Mouse-following glow
  // -----------------------------
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
      });
    };

    const handleMouseLeave = () => {
      setMousePosition((prev) => ({
        ...prev,
        opacity: 0,
      }));
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // -----------------------------
  // Get Todos
  // -----------------------------
  useEffect(() => {
    if (currentUser) {
      getTodos();
    }
  }, [currentUser]);

  const getTodos = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/get-todo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodos(response.data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // -----------------------------
  // Create Todo
  // -----------------------------
  const handleSubmit = async () => {
    if (!title || !description || !priority) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/create-todo",
        {
          title: title,
          description: description,
          priority: priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setTodos([...todos, response.data.todo]);

      setTitle("");
      setDescription("");
      setPriority("");
      setShowForm(false);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  // -----------------------------
  // Delete Todo
  // -----------------------------
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/delete-todo/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // -----------------------------
  // Cancel
  // -----------------------------
  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setPriority("");
    setShowForm(false);
  };

  // -----------------------------
  // Add
  // -----------------------------
  const handleAdd = () => {
    setTitle("");
    setDescription("");
    setPriority("");
    setShowForm(true);
  };

  // -----------------------------
  // Search Filter
  // -----------------------------
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* <style>{`
        @keyframes gridPulse {
          0% {
            opacity: 0.08;
          }

          50% {
            opacity: 0.18;
          }

          100% {
            opacity: 0.08;
          }
        }

        @keyframes floating {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }

          50% {
            transform: translateY(-15px) translateX(6px);
            opacity: 0.7;
          }
        }

        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .grid-background {
          background-image:
            linear-gradient(
              rgba(148, 163, 184, 0.07) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(148, 163, 184, 0.07) 1px,
              transparent 1px
            );

          background-size: 60px 60px;
          animation: gridPulse 5s ease-in-out infinite;
        }

        .floating-dot {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 9999px;
          background: #cbd5e1;
          animation: floating 4s ease-in-out infinite;
        }

        .todo-card {
          animation: fadeUp 0.5s ease-out forwards;
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            background 0.3s ease,
            box-shadow 0.3s ease;
        }

        .todo-card:hover {
          transform: translateY(-5px);
          border-color: rgba(148, 163, 184, 0.4);
          background: rgba(15, 23, 42, 0.8);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
        }

        .serenity-input {
          transition:
            border-color 0.3s ease,
            box-shadow 0.3s ease,
            background 0.3s ease;
        }

        .serenity-input:focus {
          outline: none;
          border-color: rgba(148, 163, 184, 0.5);
          box-shadow: 0 0 25px rgba(148, 163, 184, 0.05);
        }

        .add-card {
          transition:
            transform 0.3s ease,
            border-color 0.3s ease;
        }

        .add-card:hover {
          border-color: rgba(148, 163, 184, 0.4);
        }
      `}</style> */}

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-black to-slate-900 text-slate-100">

        {/* Grid Background */}
        <div className="grid-background pointer-events-none absolute inset-0" />

        {/* Mouse Glow */}
        <div
          className="pointer-events-none fixed z-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400/5 blur-3xl transition-all duration-100"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            opacity: mousePosition.opacity,
          }}
        />

        {/* Floating Dots */}
        <div
          className="floating-dot"
          style={{
            top: "20%",
            left: "8%",
            animationDelay: "0s",
          }}
        />

        <div
          className="floating-dot"
          style={{
            top: "30%",
            right: "10%",
            animationDelay: "1s",
          }}
        />

        <div
          className="floating-dot"
          style={{
            top: "65%",
            left: "12%",
            animationDelay: "2s",
          }}
        />

        <div
          className="floating-dot"
          style={{
            top: "75%",
            right: "8%",
            animationDelay: "1.5s",
          }}
        />

        {/* Corner Decorations */}
        <div className="pointer-events-none absolute left-6 top-6 h-10 w-10 border-l border-t border-slate-400/20" />

        <div className="pointer-events-none absolute right-6 top-6 h-10 w-10 border-r border-t border-slate-400/20" />

        <div className="pointer-events-none absolute bottom-6 left-6 h-10 w-10 border-b border-l border-slate-400/20" />

        <div className="pointer-events-none absolute bottom-6 right-6 h-10 w-10 border-b border-r border-slate-400/20" />

        {/* Main Content */}
        <div className="relative z-10 mx-auto min-h-screen max-w-7xl px-5 py-10 sm:px-8 md:px-12">

          {/* Page Header */}
          <div className="text-center">

            <div className="flex items-center justify-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80 text-lg font-bold text-slate-200 shadow-lg">
                ✓
              </div>

              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">
                Todo Workspace
              </span>

            </div>

            <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-slate-400 to-transparent" />

            <p className="mt-4 text-xs font-mono uppercase tracking-[0.3em] text-slate-500">
              Create. Prioritize. Complete.
            </p>

          </div>

          {/* Welcome */}
          <div className="mx-auto mt-12 max-w-4xl text-center">

            <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-600">
              Your Tasks
            </p>

            <h1 className="mt-3 text-4xl font-extralight tracking-tight text-slate-100 sm:text-5xl md:text-6xl">
              Stay{" "}
              <span className="font-light text-slate-400">
                Focused.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              Welcome back, {currentUser?.name}.
              <br />
              Keep your tasks organized and focus on what matters.
            </p>

          </div>

          {/* Search + Add */}
          <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-3 sm:flex-row">

            <input
              className="serenity-input w-full rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-3 text-sm text-slate-200 placeholder-slate-600 backdrop-blur"
              type="text"
              placeholder="Search your tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              onClick={handleAdd}
              className="group rounded-xl border border-slate-600 bg-slate-100 px-7 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:bg-white hover:shadow-lg hover:shadow-slate-500/10"
            >
              Add Task
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                +
              </span>
            </button>

          </div>

          {/* Todo Grid */}
          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {/* Add Form */}
            {showForm && (
              <div className="add-card rounded-2xl border border-slate-700 bg-slate-900/70 p-6 backdrop-blur-xl">

                <div className="mb-6 flex items-center justify-between">

                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-600">
                      New Task
                    </p>

                    <h2 className="mt-1 text-xl font-medium text-slate-200">
                      Add Todo
                    </h2>
                  </div>

                  <span className="text-2xl text-slate-600">
                    +
                  </span>

                </div>

                {/* Title */}
                <input
                  className="serenity-input w-full rounded-lg border border-slate-700 bg-slate-950/80 p-3 text-sm text-slate-200 placeholder-slate-600"
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                {/* Description */}
                <textarea
                  className="serenity-input mt-4 w-full resize-none rounded-lg border border-slate-700 bg-slate-950/80 p-3 text-sm text-slate-200 placeholder-slate-600"
                  placeholder="Enter description"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                {/* Priority */}
                <select
                  className="serenity-input mt-4 w-full rounded-lg border border-slate-700 bg-slate-950/80 p-3 text-sm text-slate-300"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="">Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>

                {/* Buttons */}
                <div className="mt-5 flex gap-3">

                  <button
                    onClick={handleSubmit}
                    className="flex-1 rounded-lg border border-slate-600 bg-slate-100 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-950 transition hover:bg-white"
                  >
                    Submit
                  </button>

                  <button
                    onClick={handleCancel}
                    className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400 transition hover:border-slate-500 hover:text-slate-200"
                  >
                    Cancel
                  </button>

                </div>

              </div>
            )}

            {/* Todo Cards */}
            {filteredTodos.map((todo, index) => (
              <div
                key={todo.id}
                className="todo-card rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl"
                style={{
                  animationDelay: `${index * 80}ms`,
                }}
              >

                {/* Card Number */}
                <div className="flex items-center justify-between">

                  <span className="text-xs font-mono tracking-[0.2em] text-slate-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-slate-600">
                    •
                  </span>

                </div>

                {/* Title */}
                <h2 className="mt-5 border-b border-slate-800 pb-4 text-xl font-medium text-slate-200 break-words">
                  {todo.title}
                </h2>

                {/* Description */}
                <div className="mt-5">

                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-600">
                    Description
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-400 break-words">
                    {todo.description}
                  </p>

                </div>

                {/* Priority */}
                <div className="mt-5">

                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-600">
                    Priority
                  </p>

                  <p className="mt-2 text-sm font-medium text-slate-300">
                    {todo.priority}
                  </p>

                </div>

                {/* Delete */}
                <div className="mt-6 border-t border-slate-800 pt-5">

                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs font-mono uppercase tracking-[0.15em] text-slate-500 transition duration-300 hover:border-red-900/50 hover:bg-red-950/20 hover:text-red-400"
                  >
                    Delete Task
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* No Tasks */}
          {filteredTodos.length === 0 && !showForm && (
            <div className="mx-auto mt-12 max-w-md text-center">

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 backdrop-blur">

                <div className="text-3xl text-slate-700">
                  ○
                </div>

                <p className="mt-4 text-sm text-slate-500">
                  {search
                    ? "No tasks found."
                    : "No tasks yet. Create your first task."}
                </p>

              </div>

            </div>
          )}

          {/* Footer */}
          <div className="mt-16 pb-5 text-center">

            <div className="mx-auto mb-5 h-px w-32 bg-gradient-to-r from-transparent via-slate-500/40 to-transparent" />

            <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-600">
              Create. Focus. Get Things Done.
            </p>

            <div className="mt-4 flex justify-center gap-3">

              <div className="h-1 w-1 rounded-full bg-slate-400/40" />

              <div className="h-1 w-1 rounded-full bg-slate-300/60" />

              <div className="h-1 w-1 rounded-full bg-slate-400/40" />

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Todo;