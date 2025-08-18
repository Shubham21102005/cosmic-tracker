// src/pages/LoginPage.jsx
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => {
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

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/home");
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
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #4F46E5, #7C3AED, #1E40AF)',
            animation: 'float 15s infinite alternate'
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #0891B2, #0E7490, #155E75)',
            animation: 'float 20s infinite alternate-reverse'
          }}
        ></div>
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.1) 0%, rgba(2, 6, 23, 0.9) 70%)'
          }}
        ></div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-900/70 backdrop-blur-lg rounded-2xl border border-slate-700/50 shadow-2xl shadow-slate-950/50">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-800 p-3 rounded-xl inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center text-slate-100 font-orbitron tracking-tight">
            Stellar Portal
          </h2>
          <p className="mt-2 text-slate-400 font-exo">
            Enter your credentials to access the cosmos
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
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
                placeholder="astro@explorer.com"
                className="w-full px-4 py-3 pl-11 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
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
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 pl-11 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          {error && (
            <div className="p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-center">
              <p className="text-red-400 text-sm font-exo">{error}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full px-5 py-3 font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-700 rounded-xl hover:from-indigo-700 hover:to-violet-800 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-300 flex justify-center items-center group"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Accessing Portal...
              </>
            ) : (
              <>
                <span className="group-hover:scale-105 transition-transform">Login to Cosmos</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </form>
        
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-slate-800/50">
          <Link 
            to="/signup" 
            className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors font-exo"
          >
            Create Stellar Account
          </Link>
          <Link 
            to="/" 
            className="text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors mt-2 sm:mt-0 font-exo"
          >
            Return to Home
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-10px, 10px) scale(1.05); }
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