import { useState, useEffect } from "react";

export default function useWeather(lat, lon) {
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus("loading");
    setData(null);
    setError(null);

    if (!lat || !lon) {
      setError("Latitude and longitude are required.");
      setStatus("error");
      return;
    }

    async function fetchWeather() {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        console.log ("apikey",apiKey);
        
        if (!apiKey) {
          throw new Error("OpenWeather API key is missing. Add VITE_OPENWEATHER_KEY to your .env file");
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        console.log("Fetching weather from OpenWeatherMap...");

        const res = await fetch(url);
        
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Invalid OpenWeatherMap API key. Please check your .env file");
          }
          throw new Error(`OpenWeatherMap API error (${res.status})`);
        }

        const json = await res.json();
        
        if (!json.main || !json.weather || !json.weather[0]) {
          throw new Error("Invalid weather API response");
        }

        setData(json);
        setStatus("success");
      } catch (err) {
        console.error("Weather fetch error:", err);
        setError(err.message);
        setStatus("error");
      }
    }

    fetchWeather();
  }, [lat, lon]);

  return { status, data, error };
}