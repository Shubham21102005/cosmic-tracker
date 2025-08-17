// src/pages/HomePage.jsx

import { useEffect, useState } from "react";
import { fetchNeoFeed } from "../nasaApi";
import { mapNeoFeed } from "../neoMapper";
import EventSection from "../components/EventSection";
import Loader from "../components/Loader";

// Helper function to format dates to YYYY-MM-DD
const formatDate = (date) => date.toISOString().split("T")[0];

export default function HomePage() {
  const [feed, setFeed] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the date range inputs
  const [startDate, setStartDate] = useState(() => formatDate(new Date()));
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return formatDate(date);
  });

  // Reusable function to fetch data for a given range
  const fetchForDateRange = async (start, end) => {
    try {
      // Validate date range (max 7 days for this API)
      const diffInMs = new Date(end) - new Date(start);
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      if (diffInDays < 0) {
        setError("End date cannot be before the start date.");
        setFeed({});
        return;
      }
      if (diffInDays > 7) {
        setError("The maximum date range is 7 days.");
        setFeed({});
        return;
      }

      setIsLoading(true);
      setError(null);
      const raw = await fetchNeoFeed(start, end);
      const clean = mapNeoFeed(raw);
      setFeed(clean);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Please try again later.");
      setFeed({}); // Clear previous results on error
    } finally {
      setIsLoading(false);
    }
  };

  // Effect for the initial data load using the default date range
  useEffect(() => {
    fetchForDateRange(startDate, endDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Runs only once on mount

  // Handler for the search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    fetchForDateRange(startDate, endDate);
  };

  const sortedDates = Object.keys(feed).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-slate-100 mb-8">
        Near-Earth Events
      </h1>

      {/* Date Range Selector Form */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12 p-6 bg-slate-800 rounded-lg border border-slate-700"
      >
        <div className="w-full sm:w-auto">
          <label
            htmlFor="start-date"
            className="block text-sm font-medium text-slate-400 mb-1"
          >
            Start Date
          </label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="w-full sm:w-auto">
          <label
            htmlFor="end-date"
            className="block text-sm font-medium text-slate-400 mb-1"
          >
            End Date
          </label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto self-end px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Conditional Rendering for Loading, Error, and Data */}
      {isLoading && <Loader />}
      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}
      {!isLoading &&
        !error &&
        sortedDates.length > 0 &&
        sortedDates.map((date) => (
          <EventSection key={date} date={date} events={feed[date]} />
        ))}
      {!isLoading && !error && sortedDates.length === 0 && (
        <p className="text-center text-slate-400">
          No events found for the selected date range.
        </p>
      )}
    </>
  );
}