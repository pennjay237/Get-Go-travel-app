import React from "react";
import AttractionCard from "./AttractionCard";

const AttractionsList = ({ attractions, loading, error }) => {
  if (loading) return <p className="text-center p-4">Loading attractions...</p>;
  if (error) return <p className="text-center p-4 text-red-500">Failed to load attractions</p>;
  if (!attractions || attractions.length === 0)
    return <p className="text-center p-4 text-gray-500">No attractions found</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {attractions.map((attraction) => (
        <AttractionCard key={attraction.id} attraction={attraction} />
      ))}
    </div>
  );
};

export default AttractionsList;
