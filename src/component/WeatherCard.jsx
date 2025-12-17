import React from "react";
import useWeather from "../hooks/useWeather";

export default function WeatherCard({ lat, lon }) {
  const { status, data, error } = useWeather(lat, lon);

  if (status === "loading") {
    return (
      <div className="bg-white rounded-xl shadow p-5 animate-pulse">
        <div className="h-6 w-24 bg-slate-200 rounded mb-3" />
        <div className="h-10 w-32 bg-slate-200 rounded" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="bg-rose-50 text-rose-700 rounded-xl shadow p-5">
        Unable to load weather information
      </div>
    );
  }

  if (!data?.current) return null;

  const current = data.current;

  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center justify-between">
      {/* LEFT */}
      <div>
        <div className="text-4xl font-bold">
          {Math.round(current.temp_c)}°C
        </div>

        <div className="text-slate-600 mt-1 capitalize">
          {current.condition.text}
        </div>

        <div className="text-sm text-slate-500 mt-2">
          Feels like {Math.round(current.feelslike_c)}°C
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-center">
        <img
          src={current.condition.icon}
          alt={current.condition.text}
          className="w-16 h-16"
        />
        <div className="text-xs text-slate-500 mt-1">
          Humidity {current.humidity}%
        </div>
      </div>
    </div>
  );
}
