// src/nasaApi.js

const API_BASE = "https://api.nasa.gov/neo/rest/v1";
const apiKey = import.meta.env.VITE_NASA_API_KEY;

/**
 * Fetch Near-Earth Objects between start and end dates (YYYY-MM-DD).
 */
export async function fetchNeoFeed(startDate, endDate) {
  const url = `${API_BASE}/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`NASA API error: ${res.status}`);
  }
  const data = await res.json();
  return data.near_earth_objects;
}

/**
 * NEW: Fetch a single Near-Earth Object by its ID.
 */
export async function fetchNeoById(id) {
  const url = `${API_BASE}/neo/${id}?api_key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`NASA API error: ${res.status}`);
  }
  return await res.json();
}