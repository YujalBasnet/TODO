import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    opacity: 0,
  });

  const [ripples, setRipples] = useState([]);

  // Mouse glow
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

  // Click ripple
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

  // Word animation
  useEffect(() => {
    const words = document.querySelectorAll(".landing-word");

    words.forEach((word, index) => {
      setTimeout(() => {
        word.style.opacity = "1";
        word.style.transform = "translateY(0) scale(1)";
        word.style.filter = "blur(0)";
      }, 300 + index * 150);
    });
  }, []);

  return (
    <>
      <style>{`
        @keyframes wordAppear {
          0% {
            opacity: 0;
            transform: translateY(25px) scale(0.9);
            filter: blur(8px);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

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

        .landing-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(25px) scale(0.9);
          filter: blur(8px);
          margin: 0 0.12em;
          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }

        .landing-word:hover {
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
      `}</style>

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-black to-slate-900 text-slate-100">

        {/* Background Grid */}
        <div className="grid-background absolute inset-0 pointer-events-none" />

        {/* Background Glow */}
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
            left: "12%",
            animationDelay: "0s",
          }}
        />

        <div
          className="floating-dot"
          style={{
            top: "30%",
            right: "15%",
            animationDelay: "1s",
          }}
        />

        <div
          className="floating-dot"
          style={{
            top: "70%",
            left: "18%",
            animationDelay: "2s",
          }}
        />

        <div
          className="floating-dot"
          style={{
            top: "75%",
            right: "10%",
            animationDelay: "1.5s",
          }}
        />

        <div
          className="floating-dot"
          style={{
            top: "45%",
            left: "8%",
            animationDelay: "2.5s",
          }}
        />

        {/* Corner Decorations */}
        <div className="absolute left-6 top-6 h-10 w-10 border-l border-t border-slate-400/20" />

        <div className="absolute right-6 top-6 h-10 w-10 border-r border-t border-slate-400/20" />

        <div className="absolute bottom-6 left-6 h-10 w-10 border-b border-l border-slate-400/20" />

        <div className="absolute bottom-6 right-6 h-10 w-10 border-b border-r border-slate-400/20" />

        {/* Main Content */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-between px-6 py-10 sm:px-10 md:px-16 md:py-14">

          {/* Top */}
          <div className="text-center">

            <div className="flex items-center justify-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80 text-lg font-bold text-slate-200 shadow-lg">
                ✓
              </div>

              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">
                Todo App
              </span>

            </div>

            <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-slate-400 to-transparent" />

            <p className="mt-4 text-xs font-mono uppercase tracking-[0.3em] text-slate-500">
              Simple. Focused. Productive.
            </p>

          </div>

          {/* Center */}
          <div className="relative mx-auto max-w-5xl text-center">

            <p className="mb-6 text-xs font-mono uppercase tracking-[0.3em] text-slate-500 sm:text-sm">
              <span className="landing-word">
                Organize
              </span>

              <span className="landing-word">
                your
              </span>

              <span className="landing-word">
                day.
              </span>
            </p>

            <h1 className="text-4xl font-extralight leading-tight tracking-tight text-slate-50 sm:text-5xl md:text-6xl lg:text-7xl">

              <div className="mb-3">
                <span className="landing-word">
                  Plan.
                </span>

                <span className="landing-word">
                  Prioritize.
                </span>

                <span className="landing-word">
                  Complete.
                </span>
              </div>

              <div className="text-xl font-thin leading-relaxed tracking-wide text-slate-400 sm:text-2xl md:text-3xl">

                <span className="landing-word">
                  Turn
                </span>

                <span className="landing-word">
                  your
                </span>

                <span className="landing-word">
                  tasks
                </span>

                <span className="landing-word">
                  into
                </span>

                <span className="landing-word">
                  progress.
                </span>

              </div>

            </h1>

            {/* Decorative Lines */}
            <div className="absolute -left-8 top-1/2 hidden h-px w-6 bg-slate-400/30 sm:block" />

            <div className="absolute -right-8 top-1/2 hidden h-px w-6 bg-slate-400/30 sm:block" />

            {/* Description */}
            <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              A simple workspace to create tasks, set priorities,
              and keep track of everything that matters.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                to="/login"
                className="group rounded-xl border border-slate-600 bg-slate-100 px-7 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:bg-white hover:shadow-lg hover:shadow-slate-500/10"
              >
                Get Started
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                to="/register"
                className="rounded-xl border border-slate-700 bg-slate-900/70 px-7 py-3 text-sm font-semibold text-slate-200 backdrop-blur transition duration-300 hover:border-slate-500 hover:bg-slate-800"
              >
                Create Account
              </Link>

            </div>

          </div>

          {/* Bottom */}
          <div className="text-center">

            <div className="underline mx-auto mb-5 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent" />

            <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500">
              <span className="landing-word">
                Create.
              </span>

              <span className="landing-word">
                Focus.
              </span>

              <span className="landing-word">
                Get
              </span>

              <span className="landing-word">
                Things
              </span>

              <span className="landing-word">
                Done.
              </span>
            </p>

            {/* Small Dots */}
            <div className="mt-5 flex justify-center gap-3">

              <div className="h-1 w-1 rounded-full bg-slate-400/40" />

              <div className="h-1 w-1 rounded-full bg-slate-300/60" />

              <div className="h-1 w-1 rounded-full bg-slate-400/40" />

            </div>

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

export default Landing;