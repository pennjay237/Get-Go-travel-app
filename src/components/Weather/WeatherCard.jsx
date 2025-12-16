import React from "react";
import { formatTemperature, getTempUnit } from "../../utils/formatTemp";

const WeatherCard = ({ weather, loading, error, countryCode }) => {
  if (loading) return <div className="p-4 text-center">Loading weather...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Failed to load weather</div>;
  if (!weather) return null;

  const unit = getTempUnit(countryCode);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
      <img
        src={weather.icon}
        alt={weather.description}
        className="w-16 h-16 mb-2"
      />
      <h2 className="text-2xl font-semibold">
        {formatTemperature(weather.temperature, unit)}
      </h2>
      <p className="text-gray-600">{weather.description}</p>
    </div>
  );
};

export default WeatherCard;
