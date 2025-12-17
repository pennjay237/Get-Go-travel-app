import React from "react";
import useWeather from "../../hooks/useWeather";

export default function WeatherCard({ lat, lon }) {
  const { status, data, error } = useWeather(lat, lon);

  if (status === "loading") {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse transition-colors">
        <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl shadow-lg p-6 transition-colors">
        <div className="flex items-start gap-3">
          <div className="text-2xl">⚠️</div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Weather Unavailable</h3>
            <p className="text-sm mb-2">{error || "Unable to load weather data"}</p>
            <p className="text-xs">
              Get a free API key from{" "}
              <a 
                href="https://openweathermap.org/api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-blue-600"
              >
                OpenWeatherMap
              </a>{" "}
              and add it to your .env file as VITE_OPENWEATHER_KEY
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.main || !data.weather) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300 rounded-xl shadow-lg p-6 transition-colors">
        <h3 className="font-semibold text-lg mb-2">Weather Data Incomplete</h3>
        <p className="text-sm">Received weather data is missing required information.</p>
      </div>
    );
  }

  const { main, weather, wind, visibility, clouds, sys } = data;
  const weatherCondition = weather[0];
  
  const temperature = Math.round(main.temp);
  const feelsLike = Math.round(main.feels_like);
  const condition = weatherCondition.description;
  const humidity = main.humidity;
  const pressure = main.pressure;
  const windSpeed = Math.round(wind.speed * 3.6); 
  const visibilityKm = visibility ? Math.round(visibility / 1000) : "N/A";
  const cloudiness = clouds?.all || "N/A";
  
  const iconCode = weatherCondition.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  
  const location = data.name || `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
  
  const sunrise = sys.sunrise ? new Date(sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "N/A";
  const sunset = sys.sunset ? new Date(sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "N/A";

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow-lg p-6 transition-colors">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-semibold text-xl">Current Weather</h3>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {location} • OpenWeatherMap
          </div>
        </div>
        <img
          src={iconUrl}
          alt={condition}
          className="w-16 h-16"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = `<div class="text-4xl">${getWeatherEmoji(iconCode)}</div>`;
          }}
        />
      </div>
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="lg:w-1/2">
          <div className="flex items-end gap-3 mb-4">
            <div className="text-5xl font-bold">{temperature}°C</div>
            <div className="text-lg text-gray-600 dark:text-gray-400">
              Feels like {feelsLike}°C
            </div>
          </div>
          
          <div className="text-xl font-medium capitalize mb-6">
            {condition}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span>💧</span>
                <span className="font-medium">Humidity</span>
              </div>
              <div className="text-2xl font-bold">{humidity}%</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span>💨</span>
                <span className="font-medium">Wind</span>
              </div>
              <div className="text-2xl font-bold">{windSpeed} km/h</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span>🌡️</span>
                <span className="font-medium">Pressure</span>
              </div>
              <div className="text-2xl font-bold">{pressure} hPa</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span>👁️</span>
                <span className="font-medium">Visibility</span>
              </div>
              <div className="text-2xl font-bold">{visibilityKm} km</div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 space-y-6">
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5">
            <h4 className="font-medium mb-4">Sunrise & Sunset</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">🌅</div>
                <div className="font-semibold">Sunrise</div>
                <div className="text-gray-600 dark:text-gray-400">{sunrise}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🌇</div>
                <div className="font-semibold">Sunset</div>
                <div className="text-gray-600 dark:text-gray-400">{sunset}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
            <h4 className="font-medium mb-3">Additional Information</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Cloudiness</span>
                <span className="font-medium">{cloudiness}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Min/Max Temp</span>
                <span className="font-medium">
                  {Math.round(main.temp_min)}° / {Math.round(main.temp_max)}°
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Wind Direction</span>
                <span className="font-medium">
                  {wind.deg ? `${getWindDirection(wind.deg)} (${wind.deg}°)` : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getWindDirection(degrees) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

function getWeatherEmoji(iconCode) {
  if (!iconCode) return "☀️";
  
  if (iconCode.includes("01")) return "☀️";
  if (iconCode.includes("02")) return "⛅";  
  if (iconCode.includes("03")) return "☁️"; 
  if (iconCode.includes("04")) return "☁️"; 
  if (iconCode.includes("09")) return "🌧️"; 
  if (iconCode.includes("10")) return "🌦️"; 
  if (iconCode.includes("11")) return "⛈️"; 
  if (iconCode.includes("13")) return "❄️"; 
  if (iconCode.includes("50")) return "🌫️"; 
  
  return "☀️";
}