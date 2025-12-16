import { useState, useEffect } from "react";
import { getWeatherByCity } from "../services/weatherApi";

export default function useWeather(destination) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!destination?.name) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getWeatherByCity(destination.name);
        setWeather(data);
      } catch (err) {
        setError("Failed to fetch weather info");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [destination]);

  return { weather, loading, error };
}
