import React from "react";

const AttractionCard = ({ attraction }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <img
        src={attraction.image || "/icons/placeholder.png"}
        alt={attraction.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{attraction.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{attraction.address}</p>
        {attraction.description && (
          <p className="text-gray-600 text-sm mt-2 line-clamp-3">{attraction.description}</p>
        )}
      </div>
    </div>
  );
};

export default AttractionCard;
