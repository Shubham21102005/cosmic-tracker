// src/components/Header.jsx

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { supabase } from "../supabaseClient";

export default function Header() {
  const { session } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/"); // Redirect to landing page after logout
  }

  return (
    <nav className="flex justify-between items-center mb-10 pb-4 border-b border-slate-700">
      <Link
        to={session ? "/home" : "/"}
        className="text-2xl font-bold text-slate-100 hover:text-indigo-400 transition-colors"
      >
        Cosmic Tracker
      </Link>
      <div className="flex items-center gap-6">
        {session ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="font-semibold hover:text-indigo-400 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="font-semibold hover:text-indigo-400 transition-colors"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}