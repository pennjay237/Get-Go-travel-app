import React from "react";

const LanguageInfo = ({ languages, loading, error }) => {
  if (loading) return <p className="p-4 text-center">Loading languages...</p>;
  if (error) return <p className="p-4 text-center text-red-500">Failed to load languages</p>;
  if (!languages || languages.length === 0)
    return <p className="p-4 text-center text-gray-500">No language info available</p>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-2">Languages Spoken</h3>
      <ul className="list-disc list-inside text-gray-700">
        {languages.map((lang, idx) => (
          <li key={idx}>{lang}</li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageInfo;
