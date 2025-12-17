import React, { useEffect, useState } from "react";
import { fetchNearestAirport } from "../hooks/geoapify";

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
        if (!data || data.length === 0) {
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

  /* States */
  if (loading)
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-gray-500">
        Loading nearby airports…
      </div>
    );

  if (error)
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-red-600">
        {error}
      </div>
    );

  return (
    <section className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <h3 className="text-2xl font-bold">Nearby Airports</h3>

      <ul className="space-y-3">
        {airports.map((airport) => (
          <li
            key={airport.id}
            className="flex items-center justify-between p-4 rounded-xl border hover:bg-gray-50 transition"
          >
            <div>
              <p className="font-semibold">
                {airport.name}
                <span className="text-gray-500 ml-1">
                  ({airport.iata || "N/A"})
                </span>
              </p>
              <p className="text-sm text-gray-500">
                {(airport.distance / 1000).toFixed(1)} km away
              </p>
            </div>

            <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
              Airport
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
