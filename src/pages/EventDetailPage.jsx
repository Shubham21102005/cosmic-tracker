// src/pages/EventDetailPage.jsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchNeoById } from "../nasaApi";
import Loader from "../components/Loader";

export default function EventDetailPage() {
  const { id } = useParams(); // Gets the ':id' from the URL
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
  }, [id]); // Re-run effect if the id changes

  if (isLoading) return <Loader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!event) return null;

  const diameter = event.estimated_diameter.kilometers;
  const orbitalData = event.orbital_data;

  // Helper for formatting large numbers
  const formatNumber = (num) => parseFloat(num).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });

  return (
    <div>
      <Link
        to="/home"
        className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors mb-6 inline-block"
      >
        &larr; Back to Events
      </Link>

      <div className="bg-slate-800 border border-slate-700 p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-2 text-slate-100">{event.name}</h1>
        {event.is_potentially_hazardous_asteroid && (
          <p className="text-xl text-red-500 font-bold mb-6">
            ⚠ Potentially Hazardous
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 text-sm">
          {/* Physical Characteristics Section */}
          <div>
            <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-3 mb-4">
              Physical Characteristics
            </h2>
            <div className="space-y-3">
              <p>
                <span className="font-semibold text-slate-400">Est. Diameter:</span>{" "}
                {diameter.estimated_diameter_min.toFixed(3)} -{" "}
                {diameter.estimated_diameter_max.toFixed(3)} km
              </p>
              <p>
                <span className="font-semibold text-slate-400">Absolute Magnitude:</span>{" "}
                {event.absolute_magnitude_h}
              </p>
              <a
                href={event.nasa_jpl_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                View JPL Orbit Diagram &rarr;
              </a>
            </div>
          </div>

          {/* Orbital Data Section */}
          <div>
            <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-3 mb-4">
              Orbital Data
            </h2>
            <div className="space-y-3">
              <p>
                <span className="font-semibold text-slate-400">First Observation:</span>{" "}
                {orbitalData.first_observation_date}
              </p>
              <p>
                <span className="font-semibold text-slate-400">Last Observation:</span>{" "}
                {orbitalData.last_observation_date}
              </p>
              <p>
                <span className="font-semibold text-slate-400">Orbit Class:</span>{" "}
                {orbitalData.orbit_class.orbit_class_type}
              </p>
            </div>
          </div>
        </div>

        {/* Close Approaches Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-3 mb-4">
            Close Approaches
          </h2>
          <div className="space-y-4 max-h-80 overflow-y-auto p-1">
            {event.close_approach_data.map((approach, index) => (
              <div
                key={index}
                className="p-4 bg-slate-900 rounded-md border border-slate-700 text-sm"
              >
                <p>
                  <span className="font-semibold text-slate-400">Date:</span>{" "}
                  {approach.close_approach_date_full}
                </p>
                <p>
                  <span className="font-semibold text-slate-400">Velocity:</span>{" "}
                  {formatNumber(approach.relative_velocity.kilometers_per_second)}{" "}
                  km/s
                </p>
                <p>
                  <span className="font-semibold text-slate-400">Miss Distance:</span>{" "}
                  {formatNumber(approach.miss_distance.kilometers)} km
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}