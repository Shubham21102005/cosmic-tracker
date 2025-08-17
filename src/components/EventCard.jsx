// src/components/EventCard.jsx

import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 flex flex-col justify-between transition-colors hover:border-indigo-500">
      <div>
        <h2 className="text-lg font-semibold mb-3 text-slate-100">
          {event.name}
        </h2>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold text-slate-400">Diameter:</span>{" "}
            {event.diameterKmAvg.toFixed(3)} km
          </p>
          <p>
            <span className="font-semibold text-slate-400">Velocity:</span>{" "}
            {event.approach.velocityKps.toFixed(2)} km/s
          </p>
          <p>
            <span className="font-semibold text-slate-400">Orbiting:</span>{" "}
            {event.approach.orbitingBody}
          </p>
          {event.hazardous && (
            <p className="text-red-500 font-bold pt-2">
              ⚠ Potentially Hazardous!
            </p>
          )}
        </div>
      </div>

      <Link
        to={`/event/${event.id}`}
        className="mt-4 font-semibold text-indigo-400 hover:text-indigo-300 transition-colors self-start"
      >
        View Details →
      </Link>
    </div>
  );
}