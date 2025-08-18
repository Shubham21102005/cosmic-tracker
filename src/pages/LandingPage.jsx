// src/pages/LandingPage.jsx
import { useMemo } from 'react';
import { Link } from "react-router-dom";

export default function LandingPage() {
  const stars = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const size = Math.random() * 3;
      const opacity = Math.random();
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

  const nebulae = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const width = 100 + Math.random() * 300;
      const height = 100 + Math.random() * 300;
      const colors = [
        ['#4F46E5', '#7C3AED', '#1E40AF'],
        ['#0891B2', '#0E7490', '#155E75'],
        ['#7E22CE', '#6D28D9', '#5B21B6'],
        ['#0EA5E9', '#0284C7', '#0369A1'],
      ][i % 4];
      
      return (
        <div 
          key={i}
          className="absolute opacity-20 blur-3xl rounded-full"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: `${width}px`,
            height: `${height}px`,
            background: `radial-gradient(circle, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
            animation: `drift ${30 + Math.random() * 30}s infinite ${Math.random() * 10}s alternate`
          }}
        />
      );
    });
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-slate-950">
      {/* Cosmic Background Elements */}
      <div className="absolute inset-0">
        {stars}
        {nebulae}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.4) 0%, rgba(2, 6, 23, 0.8) 70%, rgba(2, 6, 23, 1) 100%)'
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="mb-2">
          <div className="inline-block bg-slate-800/30 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50 mb-6">
            <span className="text-cyan-300 font-light tracking-widest text-sm">EXPLORE THE COSMOS</span>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white font-orbitron tracking-tight">
          Cosmic Event Tracker
          <span className="block mt-3 text-indigo-300 text-4xl">⨯</span>
        </h1>
        
        <p className="text-lg md:text-xl max-w-2xl mb-10 text-slate-300 font-exo leading-relaxed">
          Your personal observatory for tracking <span className="text-amber-300">Near-Earth Objects</span>, 
          celestial events, and deep space phenomena across the galaxy
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            to="/login"
            className="relative px-8 py-4 rounded-xl bg-gradient-to-br from-indigo-600 via-violet-700 to-indigo-800 
                      text-white font-medium transition-all duration-300 group overflow-hidden
                      shadow-[0_0_25px_-5px_rgba(99,102,241,0.3)] hover:shadow-[0_0_35px_-5px_rgba(99,102,241,0.5)]
                      border border-indigo-500/30 hover:scale-[1.03]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                            -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative z-10 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
              </svg>
              Login
            </span>
          </Link>
          
          <Link
            to="/signup"
            className="px-8 py-4 rounded-xl bg-slate-900/60 backdrop-blur-sm text-slate-200 font-medium 
                      transition-all duration-300 border border-slate-700/50 hover:border-cyan-400/30
                      hover:shadow-[0_0_25px_-5px_rgba(8,145,178,0.2)] hover:bg-slate-900/80 hover:text-white
                      hover:scale-[1.03]"
          >
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
              Create Account
            </span>
          </Link>
        </div>
        
        <div className="mt-16 text-slate-500 text-sm flex flex-col items-center">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-4"></div>
          <span>Discover the universe's secrets</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-20px, 10px) rotate(-2deg); }
          50% { transform: translate(15px, -15px) rotate(3deg); }
          75% { transform: translate(-10px, 15px) rotate(-1deg); }
        }
        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
          text-shadow: 0 0 10px rgba(164, 202, 255, 0.3);
        }
        .font-exo {
          font-family: 'Exo 2', sans-serif;
        }
      `}</style>
    </div>
  );
}
