// src/components/EventCard.jsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, Globe, Zap, Navigation } from "lucide-react";

export default function EventCard({ event }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-all duration-200 hover:border-indigo-300"
    >
      {/* Header with Name and Hazard Warning */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {event.name}
          </h3>
          {event.hazardous && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-red-100 border border-red-200 rounded-lg">
              <AlertTriangle className="h-3 w-3 text-red-600" />
              <span className="text-xs font-semibold text-red-800">Hazardous</span>
            </div>
          )}
        </div>
      </div>

      {/* Event Details Grid */}
      <div className="space-y-3 mb-6">
        {/* Diameter */}
        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Globe className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-slate-500 font-medium">Diameter</p>
            <p className="text-sm font-semibold text-slate-900">
              {event.diameterKmAvg.toFixed(3)} km
            </p>
          </div>
        </div>

        {/* Velocity */}
        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
          <div className="p-2 bg-green-100 rounded-lg">
            <Zap className="h-4 w-4 text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-slate-500 font-medium">Velocity</p>
            <p className="text-sm font-semibold text-slate-900">
              {event.approach.velocityKps.toFixed(2)} km/s
            </p>
          </div>
        </div>

        {/* Orbiting Body */}
        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Navigation className="h-4 w-4 text-purple-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-slate-500 font-medium">Orbiting</p>
            <p className="text-sm font-semibold text-slate-900">
              {event.approach.orbitingBody}
            </p>
          </div>
        </div>
      </div>

      {/* View Details Link */}
      <Link
        to={`/event/${event.id}`}
        className="group inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 font-semibold rounded-lg hover:from-indigo-100 hover:to-blue-100 hover:text-indigo-800 transition-all duration-200 border border-indigo-200 hover:border-indigo-300"
      >
        View Details
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}