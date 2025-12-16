import { useState, useEffect } from "react";
import { getWeatherByCity } from "../services/weatherApi";

export default function useWeather(destination) {
  const [weather, setWeather] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!destination) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getWeatherByCity(destination);
        setWeather(data.current);
        setWeeklyForecast(data.weekly || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch weather");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [destination]);

  return { weather, weeklyForecast, loading, error };
}
