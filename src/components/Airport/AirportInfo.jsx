import React from "react";

const AirportInfo = ({ airport, loading, error }) => {
  if (loading) return <p className="p-4 text-center">Loading airport info...</p>;
  if (error) return <p className="p-4 text-center text-red-500">Failed to load airport info</p>;
  if (!airport) return <p className="p-4 text-center text-gray-500">No airport info available</p>;

  return (
    <div className="bg-white shadow rounded-lg p-6 text-center">
      <h3 className="text-xl font-semibold mb-2">{airport.name}</h3>
      <p className="text-gray-600">IATA: {airport.iata}</p>
      <p className="text-gray-600">{airport.city}, {airport.country}</p>
      <p className="text-gray-600 mt-2">{airport.details}</p>
    </div>
  );
};

export default AirportInfo;
