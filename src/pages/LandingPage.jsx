// src/pages/LandingPage.jsx

import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold mb-6 text-slate-100">
        Cosmic Event Tracker <span className="text-indigo-400"></span>
      </h1>
      <p className="text-lg mb-8">
        Your personal dashboard for tracking Near-Earth Objects.
      </p>
      <div className="flex gap-6">
        <Link
          to="/login"
          className="px-8 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-indigo-100 font-semibold transition duration-200"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-8 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition duration-200 border border-slate-700"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );

}
