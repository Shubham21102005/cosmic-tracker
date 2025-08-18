// src/components/EventCard.jsx
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const velocityColor = event.approach.velocityKps > 15 
    ? "text-red-400" 
    : event.approach.velocityKps > 10 
      ? "text-amber-300" 
      : "text-emerald-300";

  return (
    <div className="relative overflow-hidden bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-[0_0_25px_-10px_rgba(99,102,241,0.3)] group">
      {/* Cosmic Glow Effect */}
      <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-indigo-600/10 blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl animate-pulse delay-500"></div>
      </div>
      
      {/* Asteroid Badge */}
      <div className="absolute top-4 right-4">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
          event.hazardous 
            ? "bg-red-900/30 text-red-400 border border-red-700/50" 
            : "bg-emerald-900/30 text-emerald-400 border border-emerald-700/50"
        }`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          {event.hazardous ? "Hazardous" : "Safe"}
        </div>
      </div>

      {/* Event Content */}
      <div className="mb-5">
        <h2 className="text-xl font-bold mb-4 text-white font-orbitron tracking-tight group-hover:text-indigo-300 transition-colors">
          {event.name}
          <div className="h-px w-16 bg-gradient-to-r from-indigo-500/50 to-transparent mt-2"></div>
        </h2>
        
        <div className="space-y-3 text-sm font-exo">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-slate-400">Diameter</p>
              <p className="text-slate-200">{event.diameterKmAvg.toFixed(3)} km</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-slate-400">Velocity</p>
              <p className={`${velocityColor}`}>{event.approach.velocityKps.toFixed(2)} km/s</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-slate-400">Orbiting</p>
              <p className="text-slate-200">{event.approach.orbitingBody}</p>
            </div>
          </div>
        </div>
      </div>

      {event.hazardous && (
        <div className="mt-4 p-3 bg-red-900/20 border border-red-700/30 rounded-lg flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-red-400 text-sm font-exo">
            Potentially Hazardous Object! High collision probability detected
          </p>
        </div>
      )}

      <Link
        to={`/event/${event.id}`}
        className="mt-6 font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center group/link"
      >
        <span className="mr-2 group-hover/link:underline">Explore Trajectory</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover/link:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </Link>
    </div>
  );
}