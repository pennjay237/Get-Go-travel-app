import React from "react";

const CurrencyInfo = ({ currencyData, loading, error }) => {
  if (loading) return <p className="p-4 text-center">Loading currency info...</p>;
  if (error) return <p className="p-4 text-center text-red-500">Failed to load currency info</p>;
  if (!currencyData) return null;

  return (
    <div className="bg-white shadow rounded-lg p-6 text-center">
      <h2 className="text-xl font-semibold">Currency: {currencyData.base}</h2>
      <p className="text-gray-600 mt-2">Updated: {currencyData.date}</p>
    </div>
  );
};

export default CurrencyInfo;
