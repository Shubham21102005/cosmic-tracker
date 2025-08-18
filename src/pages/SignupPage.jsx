// src/pages/SignupPage.jsx
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const stars = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const size = Math.random() * 2 + 1;
      const opacity = Math.random() * 0.7 + 0.3;
      const duration = Math.random() * 5 + 5;
      const delay = Math.random() * 5;
      return (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: opacity,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
      );
    });
  }, []);

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage({ type: "error", content: error.message });
    } else {
      setMessage({
        type: "success",
        content: "Check your email for the confirmation link!",
      });
    }
    setLoading(false);
  }

  return (
    <div className="relative min-h-screen flex justify-center items-center p-4 overflow-hidden">
      {/* Cosmic Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-slate-950"></div>
        {stars}
        <div 
          className="absolute top-1/3 left-1/3 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #7C3AED, #5B21B6, #1E40AF)',
            animation: 'float 20s infinite alternate-reverse'
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #0EA5E9, #0284C7, #155E75)',
            animation: 'float 15s infinite alternate'
          }}
        ></div>
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.1) 0%, rgba(2, 6, 23, 0.9) 70%)'
          }}
        ></div>
      </div>

      {/* Signup Card */}
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-900/70 backdrop-blur-lg rounded-2xl border border-slate-700/50 shadow-2xl shadow-slate-950/50">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-violet-600 to-purple-800 p-3 rounded-xl inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center text-slate-100 font-orbitron tracking-tight">
            Create Stellar Account
          </h2>
          <p className="mt-2 text-slate-400 font-exo">
            Begin your cosmic journey among the stars
          </p>
        </div>
        
        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-400 font-exo"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="explorer@galaxy.com"
                className="w-full px-4 py-3 pl-11 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-400 font-exo"
            >
              Password (min. 6 characters)
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 pl-11 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-slate-500 pt-1 font-exo">
              Use a strong password to protect your cosmic data
            </p>
          </div>
          
          {message && (
            <div className={`p-3 rounded-xl text-center border ${
              message.type === "error" 
                ? "bg-red-900/30 border-red-700/50" 
                : "bg-emerald-900/30 border-emerald-700/50"
            }`}>
              <p className={`text-sm font-exo ${
                message.type === "error" ? "text-red-400" : "text-emerald-400"
              }`}>
                {message.content}
              </p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full px-5 py-3 font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-700 rounded-xl hover:from-violet-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-violet-500 transition-all duration-300 flex justify-center items-center group"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Stellar Account...
              </>
            ) : (
              <>
                <span className="group-hover:scale-105 transition-transform">Launch Account</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 group-hover:rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </form>
        
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-slate-800/50">
          <Link 
            to="/login" 
            className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors font-exo"
          >
            Access Existing Account
          </Link>
          <Link 
            to="/" 
            className="text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors mt-2 sm:mt-0 font-exo"
          >
            Return to Cosmos
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15px, 15px) scale(1.05); }
          100% { transform: translate(10px, -10px) scale(1); }
        }
        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
          text-shadow: 0 0 8px rgba(164, 202, 255, 0.2);
        }
        .font-exo {
          font-family: 'Exo 2', sans-serif;
        }
      `}</style>
    </div>
  );
}