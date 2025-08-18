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
    <nav className="relative flex justify-between items-center py-6 mb-8 pb-4 border-b border-slate-800/50">
      {/* Cosmic Accent Line */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
      
      {/* Logo */}
      <Link
        to={session ? "/home" : "/"}
        className="flex items-center group"
      >
        <div className="mr-3 relative">
          <div className="absolute inset-0 rounded-full bg-indigo-600/20 blur group-hover:blur-md transition-all duration-500"></div>
          <div className="relative w-10 h-10 rounded-full bg-slate-900 border border-slate-700/50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400 group-hover:text-cyan-300 transition-colors" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
            </svg>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white font-orbitron tracking-tight group-hover:text-indigo-300 transition-colors">
            Cosmic Tracker
          </h1>
          <div className="h-px w-8 bg-gradient-to-r from-indigo-500/50 to-transparent mt-1 group-hover:w-16 transition-all duration-500"></div>
        </div>
      </Link>
      
      {/* Navigation */}
      <div className="flex items-center gap-4">
        {session ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl px-3 py-1.5">
              <div className="h-2 w-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></div>
              <span className="text-sm text-slate-300 font-exo">Connected</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 font-semibold text-white bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-rose-500/50 hover:shadow-[0_0_15px_-5px_rgba(244,63,94,0.3)] transition-all duration-300 flex items-center group"
            >
              <span className="mr-2 group-hover:text-rose-400 transition-colors">Logout</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-hover:text-rose-400 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-4 py-2 font-semibold text-slate-300 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-indigo-500/50 hover:text-indigo-300 transition-all duration-300 flex items-center group"
            >
              <span className="mr-2">Stellar Access</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:text-indigo-300 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 font-semibold text-white bg-gradient-to-r from-indigo-600/80 to-violet-700/80 rounded-xl hover:from-indigo-700/80 hover:to-violet-800/80 transition-all duration-300 flex items-center group border border-indigo-500/30 hover:shadow-[0_0_15px_-5px_rgba(99,102,241,0.3)]"
            >
              <span className="mr-2">Join Cosmos</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
          text-shadow: 0 0 8px rgba(164, 202, 255, 0.1);
        }
        .font-exo {
          font-family: 'Exo 2', sans-serif;
        }
      `}</style>
    </nav>
  );
}