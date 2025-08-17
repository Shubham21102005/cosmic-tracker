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
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [showHazardousOnly, setShowHazardousOnly] = useState(false);

  // State for the date inputs
  const [startDate, setStartDate] = useState(() => formatDate(new Date()));
  const [endDate, setEndDate] = useState(""); // End date is now optional

  // State to track the last date loaded for the "Load More" functionality
  const [lastLoadedDate, setLastLoadedDate] = useState(null);

  const fetchData = async (start, end, isLoadMore = false) => {
    const loader = isLoadMore ? setIsLoadingMore : setIsLoading;
    loader(true);
    setError(null);

    try {
      // API validation (max 7 days)
      const diffInMs = new Date(end) - new Date(start);
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      if (diffInDays > 7) {
        setError("The maximum date range is 7 days per request.");
        if (!isLoadMore) setFeed({});
        loader(false);
        return;
      }

      const raw = await fetchNeoFeed(start, end);
      const clean = mapNeoFeed(raw);

      if (isLoadMore) {
        setFeed((prevFeed) => ({ ...prevFeed, ...clean }));
      } else {
        setFeed(clean);
      }
      setLastLoadedDate(new Date(end));
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Please try again later.");
      if (!isLoadMore) setFeed({});
    } finally {
      loader(false);
    }
  };

  // Handler for the main search
  const handleSearch = (e) => {
    e.preventDefault();
    // If an end date is provided, use it. Otherwise, calculate a default 7-day range.
    const finalEndDate = endDate
      ? endDate
      : formatDate(
          new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 6))
        );
    fetchData(startDate, finalEndDate);
  };
  
  // Handler for loading more data
  const handleLoadMore = () => {
    if (!lastLoadedDate) return;

    const newStartDate = new Date(lastLoadedDate);
    newStartDate.setDate(lastLoadedDate.getDate() + 1);

    const newEndDate = new Date(newStartDate);
    newEndDate.setDate(newStartDate.getDate() + 2); // 3 additional days

    fetchData(formatDate(newStartDate), formatDate(newEndDate), true);
  };
  
  // Effect for the initial data load
  useEffect(() => {
    handleSearch({ preventDefault: () => {} }); // Run a default search on first load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter logic remains the same
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
    <>
      <h1 className="text-3xl font-bold text-center text-slate-100 mb-8">
        Near-Earth Events
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-4 mb-12 p-6 bg-slate-800 rounded-lg border border-slate-700"
      >
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="w-full sm:w-auto">
            <label htmlFor="start-date" className="block text-sm font-medium text-slate-400 mb-1">
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
            <label htmlFor="end-date" className="block text-sm font-medium text-slate-400 mb-1">
              End Date (Optional)
            </label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
        <div className="pt-4 border-t border-slate-700">
          <div className="flex items-center">
            <input
              id="hazardous-filter"
              type="checkbox"
              checked={showHazardousOnly}
              onChange={(e) => setShowHazardousOnly(e.target.checked)}
              className="w-4 h-4 text-red-500 bg-slate-700 border-slate-600 rounded focus:ring-red-500 focus:ring-2 cursor-pointer"
            />
            <label htmlFor="hazardous-filter" className="ml-2 text-sm font-medium text-slate-300 cursor-pointer">
              Show potentially hazardous only
            </label>
          </div>
        </div>
      </form>

      {isLoading && <Loader />}
      {error && <p className="text-center text-red-500 font-semibold">{error}</p>}
      
      {!isLoading && !error && sortedDates.length > 0 &&
        sortedDates.map((date) => (
          <EventSection key={date} date={date} events={filteredFeed[date]} />
        ))}



      {/* Conditionally render the "Load More" button */}
      {!isLoading && !endDate && sortedDates.length > 0 && (
        <div className="text-center mt-8">
          <button //test 
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="px-6 py-2 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 disabled:bg-slate-500 disabled:cursor-not-allowed"
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {!isLoading && !error && sortedDates.length === 0 && (
        <p className="text-center text-slate-400">
          {showHazardousOnly
            ? "No potentially hazardous events found for the selected date range."
            : "No events found for the selected date range."}
        </p>
      )}
    </>
  );
} 
//test