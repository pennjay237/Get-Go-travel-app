import React, { useEffect, useState } from "react";

export default function AttractionModal({ place, onClose }) {
  const [wiki, setWiki] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchWiki() {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
            place.properties.name
          )}`
        );

        if (!res.ok) throw new Error("Wiki not found");

        const data = await res.json();
        if (!cancelled) setWiki(data);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchWiki();
    return () => (cancelled = true);
  }, [place]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden relative">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Image */}
        <div className="h-64 w-full bg-gray-200">
          <img
            src={
              place.image ||
              "https://via.placeholder.com/800x400?text=No+Image"
            }
            alt={place.properties.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-3xl font-bold">
              {place.properties.name || "Unnamed Place"}
            </h2>

            <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full capitalize">
              {place.category}
            </span>
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-gray-500 animate-pulse">
              Loading information…
            </p>
          )}

          {/* Error */}
          {error && (
            <p className="text-gray-500">
              No additional information available for this location.
            </p>
          )}

          {/* Wiki */}
          {!loading && !error && wiki?.extract && (
            <p className="text-gray-700 leading-relaxed">
              {wiki.extract}
            </p>
          )}

          {/* External link */}
          {wiki?.content_urls?.desktop?.page && (
            <a
              href={wiki.content_urls.desktop.page}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-blue-600 font-medium hover:underline"
            >
              Read more on Wikipedia →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
