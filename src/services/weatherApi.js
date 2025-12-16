// src/services/weatherApi.js
const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function getWeatherByCity(cityName) {
  if (!cityName) return null;
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        cityName
      )}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    if (!res.ok) throw new Error("Weather API request failed");
    const data = await res.json();
    return data; // data.main.temp, data.weather[0], etc.
  } catch (err) {
    console.error("Weather API error:", err);
    throw err;
  }
}
