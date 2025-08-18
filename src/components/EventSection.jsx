// src/components/EventSection.jsx
import EventCard from "./EventCard";

export default function EventSection({ date, events }) {
  // Format the date string (e.g., "2025-08-18") into a more readable format
  const formatDate = (dateString) => {
    const dateObj = new Date(`${dateString}T12:00:00`);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="mb-16 relative">
      {/* Cosmic timeline element */}
      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-indigo-500/10 via-indigo-500/30 to-transparent ml-[-1.5rem] md:ml-[-2.5rem]"></div>
      
      {/* Cosmic date marker */}
      <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-indigo-500 border-2 border-indigo-300 shadow-[0_0_10px_2px_rgba(99,102,241,0.5)] ml-[-1.7rem] md:ml-[-2.7rem]"></div>
      
      {/* Date header with cosmic styling */}
      <div className="relative mb-8 pb-4 border-b border-slate-700/50">
        <div className="absolute bottom-0 left-0 h-px w-24 bg-gradient-to-r from-indigo-500 to-transparent"></div>
        <h1 className="text-2xl font-bold text-white font-orbitron tracking-tight">
          {formatDate(date)}
          <div className="inline-block ml-3 text-sm font-normal text-indigo-400 bg-indigo-900/30 px-2 py-1 rounded-full align-middle">
            {events.length} {events.length === 1 ? "Event" : "Events"}
          </div>
        </h1>
        <p className="text-sm text-slate-500 font-exo mt-1">
          Celestial objects approaching Earth on this cosmic date
        </p>
      </div>
      
      {/* Event grid with cosmic decorations */}
      <div className="relative">
        {/* Constellation pattern background */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-0.5 h-0.5 rounded-full bg-white"></div>
          <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 rounded-full bg-white"></div>
          <div className="absolute bottom-1/4 left-2/3 w-0.5 h-0.5 rounded-full bg-white"></div>
          <div className="absolute bottom-1/3 right-1/4 w-0.5 h-0.5 rounded-full bg-white"></div>
        </div>
        
        {/* Event cards grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
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
    </div>
  );
}