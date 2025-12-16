import React from "react";
import TourCard from "./TourCard";

export default function ToursList({ data }) {
  if (!data || data.length === 0) return <p className="text-gray-500">No tours found</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}
