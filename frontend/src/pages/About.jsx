import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const About = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    opacity: 0,
  });

  const [ripples, setRipples] = useState([]);

  // Mouse-following glow
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

  // Click ripple effect
  useEffect(() => {
    const handleClick = (e) => {
      const ripple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev, ripple]);

      setTimeout(() => {
        setRipples((prev) =>
          prev.filter((item) => item.id !== ripple.id)
        );
      }, 800);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // Animated words
  useEffect(() => {
    const words = document.querySelectorAll(".about-word");

    words.forEach((word, index) => {
      setTimeout(() => {
        word.style.opacity = "1";
        word.style.transform = "translateY(0) scale(1)";
        word.style.filter = "blur(0)";
      }, 200 + index * 120);
    });
  }, []);

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

        @keyframes lineGrow {
          0% {
            width: 0;
            opacity: 0;
          }

          100% {
            width: 100%;
            opacity: 0.4;
          }
        }

        @keyframes ripple {
          0% {
            width: 5px;
            height: 5px;
            opacity: 0.7;
          }

          100% {
            width: 100px;
            height: 100px;
            opacity: 0;
          }
        }

        .about-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(25px) scale(0.9);
          filter: blur(8px);
          margin: 0 0.12em;
          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }

        .about-word:hover {
          color: #cbd5e1;
          transform: translateY(-3px) scale(1.02);
          text-shadow: 0 0 25px rgba(203, 213, 225, 0.35);
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

        .ripple {
          position: fixed;
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          border: 1px solid rgba(203, 213, 225, 0.4);
          pointer-events: none;
          z-index: 100;
          animation: ripple 0.8s ease-out forwards;
        }

        .underline {
          animation: lineGrow 1.5s ease-out forwards;
        }

        .feature-card {
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            background 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          border-color: rgba(148, 163, 184, 0.35);
          background: rgba(15, 23, 42, 0.8);
        }
      `}</style> */}

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-black to-slate-900 text-slate-100">

        {/* Grid Background */}
        <div className="grid-background absolute inset-0 pointer-events-none" />

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
            top: "18%",
            left: "10%",
            animationDelay: "0s",
          }}
        />

        <div
          className="floating-dot"
          style={{
            top: "28%",
            right: "13%",
            animationDelay: "1s",
          }}
        />

        <div
          className="floating-dot"
          style={{
            top: "62%",
            left: "15%",
            animationDelay: "2s",
          }}
        />

        <div
          className="floating-dot"
          style={{
            top: "72%",
            right: "12%",
            animationDelay: "1.5s",
          }}
        />

        <div
          className="floating-dot"
          style={{
            top: "42%",
            left: "7%",
            animationDelay: "2.5s",
          }}
        />

        {/* Corner Decorations */}
        <div className="absolute left-6 top-6 h-10 w-10 border-l border-t border-slate-400/20" />

        <div className="absolute right-6 top-6 h-10 w-10 border-r border-t border-slate-400/20" />

        <div className="absolute bottom-6 left-6 h-10 w-10 border-b border-l border-slate-400/20" />

        <div className="absolute bottom-6 right-6 h-10 w-10 border-b border-r border-slate-400/20" />

        {/* Main Content */}
        <div className="relative z-10 mx-auto min-h-screen max-w-6xl px-6 py-12 sm:px-10 md:px-16">

          {/* Header */}
          <div className="text-center">

            <div className="flex items-center justify-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80 text-lg font-bold text-slate-200 shadow-lg">
                ✓
              </div>

              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">
                About Todo
              </span>

            </div>

            <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-slate-400 to-transparent" />

            <p className="mt-4 text-xs font-mono uppercase tracking-[0.3em] text-slate-500">
              Simple. Focused. Productive.
            </p>

          </div>

          {/* Hero Section */}
          <div className="mx-auto mt-20 max-w-5xl text-center">

            <p className="mb-6 text-xs font-mono uppercase tracking-[0.3em] text-slate-500 sm:text-sm">

              <span className="about-word">
                ORGANIZE
              </span>

              <span className="about-word">
                YOUR
              </span>

              <span className="about-word">
                DAY.
              </span>

            </p>

            <h1 className="text-4xl font-extralight leading-tight tracking-tight text-slate-50 sm:text-5xl md:text-6xl lg:text-7xl">

              <div className="mb-3">

                <span className="about-word">
                  Less
                </span>

                <span className="about-word">
                  Noise.
                </span>

                <span className="about-word">
                  More
                </span>

                <span className="about-word">
                  Progress.
                </span>

              </div>

              <div className="text-xl font-thin leading-relaxed tracking-wide text-slate-400 sm:text-2xl md:text-3xl">

                <span className="about-word">
                  Everything
                </span>

                <span className="about-word">
                  you
                </span>

                <span className="about-word">
                  need
                </span>

                <span className="about-word">
                  to
                </span>

                <span className="about-word">
                  stay
                </span>

                <span className="about-word">
                  organized.
                </span>

              </div>

            </h1>

            {/* Side Lines */}
            <div className="absolute left-4 top-[35%] hidden h-px w-10 bg-slate-400/30 lg:block" />

            <div className="absolute right-4 top-[35%] hidden h-px w-10 bg-slate-400/30 lg:block" />

            {/* Description */}
            <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">

              Todo App is a simple task-management workspace
              designed to help you create tasks, organize your
              priorities, and focus on what needs to be done.

            </p>

          </div>

          {/* Feature Section */}
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">

            {/* Feature 1 */}
            <div className="feature-card rounded-2xl border border-slate-800 bg-slate-900/40 p-7 backdrop-blur">

              <div className="mb-5 flex items-center justify-between">

                <span className="text-xs font-mono tracking-[0.25em] text-slate-600">
                  01
                </span>

                <span className="text-xl text-slate-400">
                  +
                </span>

              </div>

              <h2 className="text-lg font-medium text-slate-200">
                Organize
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Create and manage your daily tasks in one
                simple and focused workspace.
              </p>

            </div>

            {/* Feature 2 */}
            <div className="feature-card rounded-2xl border border-slate-800 bg-slate-900/40 p-7 backdrop-blur">

              <div className="mb-5 flex items-center justify-between">

                <span className="text-xs font-mono tracking-[0.25em] text-slate-600">
                  02
                </span>

                <span className="text-xl text-slate-400">
                  ◇
                </span>

              </div>

              <h2 className="text-lg font-medium text-slate-200">
                Prioritize
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Set High, Medium, or Low priority so you
                know which tasks need your attention.
              </p>

            </div>

            {/* Feature 3 */}
            <div className="feature-card rounded-2xl border border-slate-800 bg-slate-900/40 p-7 backdrop-blur">

              <div className="mb-5 flex items-center justify-between">

                <span className="text-xs font-mono tracking-[0.25em] text-slate-600">
                  03
                </span>

                <span className="text-xl text-slate-400">
                  ✓
                </span>

              </div>

              <h2 className="text-lg font-medium text-slate-200">
                Complete
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Keep track of your work and turn your plans
                into completed tasks.
              </p>

            </div>

          </div>

          {/* Workflow */}
          <div className="mx-auto mt-16 max-w-4xl text-center">

            <div className="underline mx-auto mb-6 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent" />

            <p className="text-xs font-mono uppercase tracking-[0.3em] text-slate-600">
              Your Workflow
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm font-mono uppercase tracking-[0.15em] text-slate-400">

              <span className="about-word">
                Create
              </span>

              <span className="text-slate-700">
                →
              </span>

              <span className="about-word">
                Prioritize
              </span>

              <span className="text-slate-700">
                →
              </span>

              <span className="about-word">
                Focus
              </span>

              <span className="text-slate-700">
                →
              </span>

              <span className="about-word">
                Complete
              </span>

            </div>

          </div>

          {/* CTA */}
          <div className="mt-16 text-center">

            <p className="text-sm text-slate-500">
              Ready to organize your day?
            </p>

            <div className="mt-5 flex justify-center">

              <Link
                to="/register"
                className="group rounded-xl border border-slate-600 bg-slate-100 px-7 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:bg-white hover:shadow-lg hover:shadow-slate-500/10"
              >
                Start Organizing

                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

              </Link>

            </div>

          </div>

          {/* Footer */}
          <div className="mt-16 pb-4 text-center">

            <div className="flex justify-center gap-3">

              <div className="h-1 w-1 rounded-full bg-slate-400/40" />

              <div className="h-1 w-1 rounded-full bg-slate-300/60" />

              <div className="h-1 w-1 rounded-full bg-slate-400/40" />

            </div>

            <p className="mt-4 text-xs font-mono uppercase tracking-[0.25em] text-slate-600">
              Create. Focus. Get Things Done.
            </p>

          </div>

        </div>

        {/* Click Ripples */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
          />
        ))}

      </div>
    </>
  );
};

export default About;