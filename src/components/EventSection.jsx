// src/components/EventSection.jsx

import EventCard from "./EventCard";

export default function EventSection({ date, events }) {
  // Format the date string (e.g., "2025-08-18") into a more readable format
  const formatDate = (dateString) => {
    // Adding a time component avoids potential timezone issues where the date might be off by one day
    const dateObj = new Date(`${dateString}T12:00:00`);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="mb-12">
      <h1 className="text-2xl font-bold text-slate-100 mb-6 pb-4 border-b border-slate-700">
        {formatDate(date)}
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}