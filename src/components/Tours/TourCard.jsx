import React from "react";

export default function TourCard({ tour }) {
  return (
    <div className="bg-white rounded shadow-md overflow-hidden">
      <img
        src={tour.image || "/icons/default.jpg"}
        alt={tour.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold">{tour.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{tour.description}</p>
        <a
          href={tour.url}
          target="_blank"
          className="text-blue-500 hover:underline mt-2 block"
        >
          Book Now
        </a>
      </div>
    </div>
  );
}
