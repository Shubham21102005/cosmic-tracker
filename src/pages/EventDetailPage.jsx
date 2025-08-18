// src/pages/EventDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchNeoById } from "../nasaApi";
import Loader from "../components/Loader";

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEventData() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchNeoById(id);
        setEvent(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch cosmic event details.");
      } finally {
        setIsLoading(false);
      }
    }
    loadEventData();
  }, [id]);

  if (isLoading) return <Loader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!event) return null;

  const diameter = event.estimated_diameter.kilometers;
  const orbitalData = event.orbital_data;

  const formatNumber = (num) => parseFloat(num).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });

  // Calculate velocity color based on speed
  const getVelocityColor = (velocity) => {
    const kmps = parseFloat(velocity);
    if (kmps > 30) return "text-red-400";
    if (kmps > 20) return "text-amber-300";
    if (kmps > 10) return "text-emerald-300";
    return "text-cyan-300";
  };

  return (
    <div className="relative min-h-screen">
      {/* Cosmic Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-slate-950"></div>
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #4F46E5, #7C3AED, #1E40AF)',
            animation: 'float 30s infinite alternate'
          }}
        ></div>
      </div>

      {/* Navigation */}
      <div className="mb-8">
        <Link
          to="/home"
          className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span className="group-hover:underline">Return to Cosmic Events</span>
        </Link>
      </div>

      {/* Event Detail Card */}
      <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl shadow-slate-950/50 overflow-hidden">
        {/* Asteroid Header */}
        <div className={`p-8 ${event.is_potentially_hazardous_asteroid ? 'bg-gradient-to-r from-red-900/30 to-rose-900/20' : 'bg-gradient-to-r from-indigo-900/30 to-violet-900/20'}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white font-orbitron tracking-tight">
                {event.name}
                <div className="h-px w-24 bg-gradient-to-r from-indigo-500/50 to-transparent mt-2"></div>
              </h1>
              <p className="text-slate-400 font-exo mt-2">
                Celestial Object ID: {id}
              </p>
            </div>
            
            {event.is_potentially_hazardous_asteroid && (
              <div className="mt-4 md:mt-0 flex items-center bg-red-900/40 border border-red-700/50 px-4 py-2 rounded-full animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-red-400">Potentially Hazardous Object</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Physical Characteristics */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-700/50 pb-3 mb-4 font-orbitron flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                Physical Characteristics
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <div>
                    <p className="text-sm font-medium text-slate-400 font-exo">Est. Diameter</p>
                    <p className="text-lg font-semibold text-white">
                      {diameter.estimated_diameter_min.toFixed(3)} -{" "}
                      {diameter.estimated_diameter_max.toFixed(3)} km
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.707 7.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L13 8.586V5a1 1 0 10-2 0v3.586l-1.293-1.293z" />
                      <path d="M5 12a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <div>
                    <p className="text-sm font-medium text-slate-400 font-exo">Absolute Magnitude</p>
                    <p className="text-lg font-semibold text-white">
                      {event.absolute_magnitude_h}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                    </svg>
                  </div>
                </div>
                
                <a
                  href={event.nasa_jpl_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group"
                >
                  <span className="mr-2 group-hover:underline">View JPL Orbit Diagram</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Orbital Data */}
            <div>
              <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-700/50 pb-3 mb-4 font-orbitron flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
                </svg>
                Orbital Data
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <div>
                    <p className="text-sm font-medium text-slate-400 font-exo">First Observation</p>
                    <p className="text-lg font-semibold text-white">
                      {orbitalData.first_observation_date}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <div>
                    <p className="text-sm font-medium text-slate-400 font-exo">Last Observation</p>
                    <p className="text-lg font-semibold text-white">
                      {orbitalData.last_observation_date}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <div>
                    <p className="text-sm font-medium text-slate-400 font-exo">Orbit Class</p>
                    <p className="text-lg font-semibold text-white">
                      {orbitalData.orbit_class.orbit_class_type}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      {orbitalData.orbit_class.orbit_class_description}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Close Approaches */}
          <div>
            <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-700/50 pb-3 mb-4 font-orbitron flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Close Approaches
            </h2>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 cosmic-scrollbar">
              {event.close_approach_data.map((approach, index) => (
                <div
                  key={index}
                  className="p-5 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 transition-all hover:border-indigo-500/50 hover:shadow-[0_0_15px_-5px_rgba(99,102,241,0.2)]"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {approach.close_approach_date_full}
                    </h3>
                    <span className="text-xs font-semibold bg-slate-700/50 px-2 py-1 rounded-full">
                      Approach #{index + 1}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-400 font-exo">Velocity</p>
                      <p className={`text-lg font-semibold ${getVelocityColor(approach.relative_velocity.kilometers_per_second)}`}>
                        {formatNumber(approach.relative_velocity.kilometers_per_second)} km/s
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-slate-400 font-exo">Miss Distance</p>
                      <p className="text-lg font-semibold text-cyan-300">
                        {formatNumber(approach.miss_distance.kilometers)} km
                      </p>
                      <p className="text-xs text-slate-500 mt-1 font-exo">
                        {approach.miss_distance.astronomical} astronomical units
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm font-medium text-slate-400 font-exo">Orbiting Body</p>
                    <p className="font-semibold text-indigo-300">
                      {approach.orbiting_body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-10px, 15px) scale(1.05); }
          100% { transform: translate(10px, -10px) scale(1); }
        }
        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
          text-shadow: 0 0 8px rgba(164, 202, 255, 0.1);
        }
        .font-exo {
          font-family: 'Exo 2', sans-serif;
        }
        .cosmic-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .cosmic-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.2);
          border-radius: 4px;
        }
        .cosmic-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #4F46E5, #7C3AED);
          border-radius: 4px;
        }
        .cosmic-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #6366F1, #8B5CF6);
        }
      `}</style>
    </div>
  );
}