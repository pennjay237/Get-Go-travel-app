import { useState, useEffect } from "react";
import { getNearestAirport } from "../services/airportApi";

export default function useAirport(coords) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coords || !coords.lat || !coords.lon) return;

    const fetchAirport = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getNearestAirport(coords.lat, coords.lon);
        setData(result);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch airport info");
      } finally {
        setLoading(false);
      }
    };

    fetchAirport();
  }, [coords]);

  return { data, loading, error };
}
