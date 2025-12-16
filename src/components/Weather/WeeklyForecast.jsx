import React from "react";
import { formatTemperature, getTempUnit } from '../../utils/formatTemp';

const WeeklyForecast = ({ forecast }) => {
  if (!forecast || forecast.length === 0)
    return <p className="text-gray-500 text-center">No forecast available</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mt-4">
      {forecast.map((day, index) => (
        <div
          key={index}
          className="bg-white p-3 rounded-lg shadow text-center"
        >
          <p className="font-semibold">{day.day}</p>
          <img
            src={day.icon}
            alt={day.description}
            className="w-10 h-10 mx-auto"
          />
          <p>{formatTemp(day.temp)}</p>
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecast;
