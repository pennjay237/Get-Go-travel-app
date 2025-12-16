import React from "react";

export default function ResultCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {title && (
        <h3 className="text-xl font-semibold mb-4 border-b pb-2">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
