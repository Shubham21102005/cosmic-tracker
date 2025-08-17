// src/components/EventSection.jsx

import { motion } from "framer-motion";
import { Calendar, AlertTriangle } from "lucide-react";
import EventCard from "./EventCard";

export default function EventSection({ date, events }) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hazardousCount = events.filter(event => event.hazardous).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden"
    >
      {/* Section Header */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-4 border-b border-slate-200/60">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Calendar className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{formattedDate}</h2>
              <p className="text-sm text-slate-600">
                {events.length} event{events.length !== 1 ? "s" : ""} detected
              </p>
            </div>
          </div>
          
          {hazardousCount > 0 && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-red-100 border border-red-200 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-semibold text-red-800">
                {hazardousCount} potentially hazardous
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Events Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}