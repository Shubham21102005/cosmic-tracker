// src/pages/EventDetailPage.jsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchNeoById } from "../nasaApi";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, Globe, Zap, Navigation, ExternalLink, Calendar, Info } from "lucide-react";

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
        setError("Failed to fetch event details.");
      } finally {
        setIsLoading(false);
      }
    }
    loadEventData();
  }, [id]);

  if (isLoading) return <Loader />;
  if (error) return (
    <div className="text-center py-20">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
        <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <p className="text-red-800 font-semibold text-lg">{error}</p>
      </div>
    </div>
  );
  if (!event) return null;

  const diameter = event.estimated_diameter.kilometers;
  const orbitalData = event.orbital_data;

  // Helper for formatting large numbers
  const formatNumber = (num) => parseFloat(num).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Link
          to="/home"
          className="inline-flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg font-medium transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Link>
      </motion.div>

      {/* Event Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-8 mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-xl">
                <Globe className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{event.name}</h1>
                {event.is_potentially_hazardous_asteroid && (
                  <div className="inline-flex items-center space-x-2 px-3 py-2 bg-red-100 border border-red-200 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-semibold text-red-800">
                      Potentially Hazardous Asteroid
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <a
              href={event.nasa_jpl_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>View JPL Orbit Diagram</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Event Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Physical Characteristics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Globe className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Physical Characteristics</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-600 font-medium">Estimated Diameter</span>
              <span className="font-semibold text-slate-900">
                {diameter.estimated_diameter_min.toFixed(3)} - {diameter.estimated_diameter_max.toFixed(3)} km
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-600 font-medium">Absolute Magnitude</span>
              <span className="font-semibold text-slate-900">{event.absolute_magnitude_h}</span>
            </div>
          </div>
        </motion.div>

        {/* Orbital Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Navigation className="h-5 w-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Orbital Data</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-600 font-medium">First Observation</span>
              <span className="font-semibold text-slate-900">{orbitalData.first_observation_date}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-600 font-medium">Last Observation</span>
              <span className="font-semibold text-slate-900">{orbitalData.last_observation_date}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-600 font-medium">Orbit Class</span>
              <span className="font-semibold text-slate-900">{orbitalData.orbit_class.orbit_class_type}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Close Approaches */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <Zap className="h-5 w-5 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Close Approaches</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {event.close_approach_data.map((approach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-4 bg-slate-50 rounded-xl border border-slate-200"
            >
              <div className="flex items-center space-x-2 mb-3">
                <Calendar className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-semibold text-slate-700">Approach {index + 1}</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Date:</span>
                  <span className="font-medium text-slate-900">{approach.close_approach_date_full}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Velocity:</span>
                  <span className="font-medium text-slate-900">
                    {formatNumber(approach.relative_velocity.kilometers_per_second)} km/s
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Miss Distance:</span>
                  <span className="font-medium text-slate-900">
                    {formatNumber(approach.miss_distance.kilometers)} km
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}