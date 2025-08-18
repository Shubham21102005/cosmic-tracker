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
  const [startDate, setStartDate] = useState(() => formatDate(new Date()));
  const [endDate, setEndDate] = useState("");
  const [lastLoadedDate, setLastLoadedDate] = useState(null);

  const fetchData = async (start, end, isLoadMore = false) => {
    const loader = isLoadMore ? setIsLoadingMore : setIsLoading;
    loader(true);
    setError(null);

    try {
      const diffInMs = new Date(end) - new Date(start);
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      
      // Fix: Add validation for negative date range
      if (diffInDays < 0) {
        setError("End date cannot be before start date.");
        loader(false);
        return;
      }
      
      // Fix: Validate date range
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
      setError("Failed to fetch cosmic data. Please try again later.");
      if (!isLoadMore) setFeed({});
    } finally {
      loader(false);
    }
  };

  // Corrected Code ✅
const handleSearch = (e) => {
  e.preventDefault();
  const finalEndDate = endDate
    ? endDate
    : formatDate(
        new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 6)) // Added missing ')' here
      );
  fetchData(startDate, finalEndDate);
};
  
  const handleLoadMore = () => {
    if (!lastLoadedDate) return;

    const newStartDate = new Date(lastLoadedDate);
    newStartDate.setDate(lastLoadedDate.getDate() + 1);
    const newEndDate = new Date(newStartDate);
    newEndDate.setDate(newStartDate.getDate() + 2);
    fetchData(formatDate(newStartDate), formatDate(newEndDate), true);
  };
  
  useEffect(() => {
    // Fix: Calculate default end date correctly
    const defaultEndDate = formatDate(
      new Date(new Date().setDate(new Date().getDate() + 6))
    );
    fetchData(startDate, defaultEndDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div className="relative">
      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #4F46E5, #7C3AED, #1E40AF)',
            animation: 'float 30s infinite alternate'
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-5 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #0891B2, #0E7490, #155E75)',
            animation: 'float 25s infinite alternate-reverse'
          }}
        ></div>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white font-orbitron tracking-tight mb-4">
          Near-Earth Events
        </h1>
        <p className="text-lg text-slate-400 max-w-3xl mx-auto font-exo">
          Track celestial objects approaching Earth in real-time
        </p>
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto mt-6"></div>
      </div>

      <form
        onSubmit={handleSearch}
        className="mb-12 p-6 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-xl shadow-slate-950/30"
      >
        <div className="flex flex-col md:flex-row gap-6 items-end">
          <div className="w-full md:w-auto flex-1">
            <label htmlFor="start-date" className="block text-sm font-medium text-slate-400 mb-2 font-exo">
              Start Date
            </label>
            <div className="relative">
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 pl-11 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-exo"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-auto flex-1">
            <label htmlFor="end-date" className="block text-sm font-medium text-slate-400 mb-2 font-exo">
              End Date (Optional)
            </label>
            <div className="relative">
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 pl-11 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-exo"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto px-6 py-3 font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-700 rounded-xl hover:from-indigo-700 hover:to-violet-800 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-300 flex items-center justify-center group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${isLoading ? 'hidden' : 'block'}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Scanning Cosmos...
              </>
            ) : "Search Events"}
          </button>
        </div>
        
        <div className="pt-6 mt-6 border-t border-slate-700/50">
          <div className="flex items-center">
            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showHazardousOnly}
                onChange={(e) => setShowHazardousOnly(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-colors ${
                showHazardousOnly ? 'bg-red-500' : 'bg-slate-700'
              }`}></div>
              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                showHazardousOnly ? 'transform translate-x-5' : ''
              }`}></div>
            </label>
            <span className="ml-3 text-sm font-medium text-slate-300 cursor-pointer font-exo flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Show potentially hazardous objects only
            </span>
          </div>
        </div>
      </form>

      {isLoading && <Loader />}
      
      {error && (
        <div className="p-4 bg-red-900/30 border border-red-700/50 rounded-xl text-center mb-12">
          <p className="text-red-400 font-exo">{error}</p>
        </div>
      )}
      
      {!isLoading && !error && sortedDates.length > 0 &&
        sortedDates.map((date) => (
          <EventSection key={date} date={date} events={filteredFeed[date]} />
        ))}

      {/* Load More Button */}
      {!isLoading && !endDate && sortedDates.length > 0 && (
        <div className="text-center mt-12">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="px-8 py-3 font-semibold text-white bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-indigo-500/50 hover:shadow-[0_0_15px_-5px_rgba(99,102,241,0.3)] transition-all duration-300 flex items-center mx-auto group"
          >
            {isLoadingMore ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading Cosmic Data...
              </>
            ) : (
              <>
                <span className="mr-2 group-hover:text-indigo-300 transition-colors">Explore Deeper Cosmos</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-hover:text-indigo-300 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}

      {!isLoading && !error && sortedDates.length === 0 && (
        <div className="text-center py-16 bg-slate-900/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-slate-300 mb-2 font-exo">
            Cosmic Silence
          </h3>
          <p className="text-slate-500 max-w-md mx-auto font-exo">
            {showHazardousOnly
              ? "No potentially hazardous celestial objects detected in this cosmic sector."
              : "The cosmos appears quiet in this sector. Try expanding your search parameters."}
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-10px, 15px) scale(1.05); }
          100% { transform: translate(10px, -10px) scale(1); }
        }
        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
          text-shadow: 0 0 10px rgba(164, 202, 255, 0.2);
        }
        .font-exo {
          font-family: 'Exo 2', sans-serif;
        }
      `}</style>
    </div>
  );
}