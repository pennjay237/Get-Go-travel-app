import React from "react";
import useWeather from "../../hooks/useWeather";

export default function WeatherCard({ lat, lon }) {
  const { status, data, error } = useWeather(lat, lon);

  if (status === "loading")
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 animate-pulse transition-colors">
        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
        <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );

  if (status === "error")
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl shadow p-5 transition-colors">
        Unable to load weather
      </div>
    );

  const current = data.current;

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow p-5 transition-colors">
      <h3 className="font-semibold text-lg mb-3">Current Weather</h3>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold">{Math.round(current.temp_c)}°C</div>
          <div className="text-gray-600 dark:text-gray-400 mt-1 capitalize">
            {current.condition.text}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Feels like {Math.round(current.feelslike_c)}°C
          </div>
        </div>
        <div className="text-right">
          <img
            src={current.condition.icon}
            alt={current.condition.text}
            className="w-16 h-16"
          />
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Humidity {current.humidity}%
          </div>
        </div>
      </div>
    </div>
  );
}