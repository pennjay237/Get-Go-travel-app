import React, { useEffect, useState } from "react";
import { fetchNearestAirport } from "../../hooks/geoapify";

export default function AirportInfo({ lat, lon }) {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    async function loadAirports() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchNearestAirport(lat, lon, null, 10);
        if (data.length === 0) {
          setError("No nearby airports found within 1000 km.");
        } else {
          setAirports(data);
        }
      } catch (err) {
        console.error("Failed to fetch airports:", err);
        setError("Unable to load airports");
      } finally {
        setLoading(false);
      }
    }

    loadAirports();
  }, [lat, lon]);

  if (loading)
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 animate-pulse transition-colors">
        <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl shadow p-5 transition-colors">
        <h3 className="font-semibold mb-1">Airports</h3>
        <p className="text-sm">{error}</p>
      </div>
    );

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow p-5 space-y-4 transition-colors">
      <h3 className="font-bold text-lg">Nearby Airports</h3>
      <ul className="space-y-3">
        {airports.map((airport) => (
          <li
            key={airport.id}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div>
              <p className="font-semibold">
                {airport.name}
                <span className="text-gray-500 dark:text-gray-400 ml-2">
                  ({airport.iata || "N/A"})
                </span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {(airport.distance / 1000).toFixed(1)} km away
              </p>
            </div>
            <span className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
              Airport
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}