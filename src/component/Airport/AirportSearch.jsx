import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_OPENTRIPMAP_API_KEY;

export default function AirportSearch() {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAirportsAround = async () => {
    setLoading(true);
    setError(null);

    try {
      const lat = 4.0511;
      const lon = 9.7679;

      const res = await fetch(
        `https://api.opentripmap.com/0.1/en/places/radius?radius=50000&lon=${lon}&lat=${lat}&kinds=airports&apikey=${API_KEY}`
      );

      if (!res.ok) throw new Error("Failed to fetch airports");

      const data = await res.json();
      setAirports(data.features || []);
    } catch (error) {
      console.error("Airport Fetch Error:", error);
      setError("Unable to load nearby airports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAirportsAround();
  }, []);

  return (
    <section className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold">Nearby Airports</h2>

      {loading && (
        <p className="text-gray-500 animate-pulse">
          Loading airports…
        </p>
      )}

      {error && (
        <p className="text-red-600">{error}</p>
      )}

      {!loading && !error && airports.length === 0 && (
        <p className="text-gray-500">
          No airports found in this area.
        </p>
      )}

      <ul className="space-y-3">
        {airports.map((airport) => (
          <li
            key={airport.id}
            className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition"
          >
            <span className="font-medium">
              {airport.properties.name || "Unnamed Airport"}
            </span>

            <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              Airport
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
