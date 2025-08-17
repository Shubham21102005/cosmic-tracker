// src/pages/HomePage.jsx

import { useEffect, useState } from "react";
import { fetchNeoFeed } from "../nasaApi";
import { mapNeoFeed } from "../neoMapper";
import EventSection from "../components/EventSection";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import { Calendar, Search, AlertTriangle, Filter } from "lucide-react";

// Helper function to format dates to YYYY-MM-DD
const formatDate = (date) => date.toISOString().split("T")[0];

export default function HomePage() {
  const [feed, setFeed] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showHazardousOnly, setShowHazardousOnly] = useState(false);

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
      // Validate date range
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

  // Effect for the initial data load
  useEffect(() => {
    fetchForDateRange(startDate, endDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Runs only once on mount

  // Handler for the search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    fetchForDateRange(startDate, endDate);
  };

  // Filter events based on hazardous checkbox
  const filteredFeed = showHazardousOnly
    ? Object.fromEntries(
        Object.entries(feed)
          .map(([date, events]) => [
            date,
            events.filter((event) => event.hazardous),
          ])
          .filter(([_, events]) => events.length > 0)
      )
    : feed;

  const sortedDates = Object.keys(filteredFeed).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-slate-100 mb-4">
          Near-Earth Events Dashboard
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Monitor asteroids and celestial bodies approaching Earth with real-time
          data from NASA.
        </p>
      </motion.div>

      {/* Search Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800 rounded-2xl border border-slate-700 p-6 mb-8"
      >
        <form onSubmit={handleSearch} className="space-y-6">
          {/* Date Range Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-300 mb-3">
                <Calendar className="h-4 w-4 mr-2 text-indigo-400" />
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-300 mb-3">
                <Calendar className="h-4 w-4 mr-2 text-indigo-400" />
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Filter and Search Row */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-700 items-center">
            {/* Hazardous Filter */}
            <div className="flex-grow flex items-center">
              <input
                type="checkbox"
                id="hazardous-filter"
                checked={showHazardousOnly}
                onChange={(e) => setShowHazardousOnly(e.target.checked)}
                className="w-4 h-4 text-red-500 bg-slate-700 border-slate-600 rounded focus:ring-red-500 focus:ring-2 cursor-pointer"
              />
              <label
                htmlFor="hazardous-filter"
                className="flex items-center text-sm font-medium text-slate-300 ml-3 cursor-pointer"
              >
                <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                Show potentially hazardous only
              </label>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search Events
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Results Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {isLoading && <Loader />}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-400 font-semibold text-lg">{error}</p>
          </div>
        )}
        {!isLoading && !error && sortedDates.length > 0 && (
          <div className="space-y-8">
            {sortedDates.map((date, index) => (
              <motion.div
                key={date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <EventSection date={date} events={filteredFeed[date]} />
              </motion.div>
            ))}
          </div>
        )}
        {!isLoading && !error && sortedDates.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-md mx-auto">
              <Filter className="h-16 w-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-100 mb-2">
                {showHazardousOnly
                  ? "No Hazardous Events Found"
                  : "No Events Found"}
              </h3>
              <p className="text-slate-400 text-sm">
                {showHazardousOnly
                  ? "No potentially hazardous bodies were detected in the selected date range."
                  : "No events were found for the selected date range. Try adjusting your search criteria."}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}